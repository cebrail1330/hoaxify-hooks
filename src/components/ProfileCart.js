import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import {useTranslation} from "react-i18next";
import Input from "./Input";
import {deleteUser, updateUser} from "../api/apiCalls";
import {useApiProgress} from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";
import {logoutSuccess, updateSuccess} from "../redux/authActions";
import Modal from "./Modal";
//userpage.js deki props bilgilerini alacak

const ProfileCart = (props) => {
    const [inEditMode, setInEditMode] = useState(false);
    const [newImage, setNewImage] = useState();
    const [user, setUser] = useState({});
    const [editable, setEditable] = useState(false)
    const [validationErrors, setValidationErrors] = useState({});
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const [modalVisible, setModalVisible] = useState(false)

    const {username, displayName, image} = user;
    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    useEffect(() => { //hatadan sonra yeni bir şey girildiğinde gelen hatanın içindeki displayname i temizleyecek
        setValidationErrors(previousValitationErrors => ({
            ...previousValitationErrors,
            displayName: undefined
        }));
    }, [updatedDisplayName])

    useEffect(() => {
        setValidationErrors(previousValitationErrors => ({
            ...previousValitationErrors,
            image: undefined
        }));
    }, [newImage])


    const {username: loggedInUsername} = useSelector(store => ({
        username: store.username
    }))

    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username)
    const pendingApiCallDeleteUser = useApiProgress('delete', '/api/1.0/users/' + username, true)
    const routeParams = useParams();

    // const {user} = props


    const pathUsername = routeParams.username;
    //const loggedInUsername = props.username;
    //Eğer path veya loggednusername değişirse editable değişecek
    useEffect(() => {
        setEditable(pathUsername === loggedInUsername)
    }, [pathUsername, loggedInUsername])

    const {t} = useTranslation()

    const onClickSave = async () => {
        let image;
        if (newImage) {
            image = newImage.split(',')[1]
        }
        const body = {
            displayName: updatedDisplayName,
            image
        };
        try {
            const response = await updateUser(username, body);
            setInEditMode(false);
            setUser(response.data);
            dispatch(updateSuccess(response.data))
        } catch (err) {
            setValidationErrors(err.response.data.validationErrors);
        }
    }

    useEffect(() => {
        if (!inEditMode) { //edit moddan çıkıyorsa
            setUpdatedDisplayName(undefined);
            setNewImage(null);
        } else { //editmode'a tıklandığında
            setUpdatedDisplayName(displayName);
        }
    }, [inEditMode, displayName])

    const onChangefile = event => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);

    }
    const onClickCancel = () => {
        setModalVisible(false)
    }

    const onClickDeleteUser = async () => {
        await deleteUser(username);
        setModalVisible(false);
        dispatch(logoutSuccess());
        history.push('/');
    }

    const {displayName: displayNameError, image: imageError} = validationErrors;
    return (
        <div className="card text-center">
            <div className="card-header">
                <ProfileImageWithDefault
                    className="rounded-circle shadow"
                    width="200" height="200"
                    alt={`${user.username} profile`}
                    image={image}
                    tepimage={newImage}
                />
            </div>
            <div className="card-body">
                {!inEditMode &&
                (
                    <>
                        <h3>{displayName}@{username}</h3>
                        {editable && (
                            <>
                                <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)}>
                                    {t('Edit')}
                                    <i className="material-icons">edit</i>
                                </button>
                                <div className="pt-2">
                                    <button className="btn btn-danger d-inline-flex"
                                            onClick={() => setModalVisible(true)}>
                                        {t('Delete My Account')}
                                        <i className="material-icons">directions_run</i>
                                    </button>
                                </div>

                            </>

                        )}
                    </>)}
                {inEditMode && (
                    <div>
                        <Input label={t("Change Display Name")}
                               defaultValue={displayName}
                               onChange={(event) => {
                                   setUpdatedDisplayName(event.target.value)
                               }}
                               error={displayNameError}
                        />
                        <Input type="file"
                               error={imageError}
                               onChange={onChangefile}/>
                        <div>
                            <ButtonWithProgress
                                className="btn btn-primary d-inline-flex"
                                onClick={onClickSave}
                                disabled={pendingApiCall}
                                pendingApiCall={pendingApiCall}
                                text={
                                    <React.Fragment>
                                        <i className="material-icons">save</i>
                                        {t('Save')}
                                    </React.Fragment>
                                }
                            />

                            <button
                                className="btn btn-light d-inline-flex ml-1"
                                onClick={() => setInEditMode(false)}
                                disabled={pendingApiCall}
                            >
                                <i className="material-icons">close</i>
                                {t('Cancel')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Modal visible={modalVisible}
                   onClickCancel={onClickCancel}
                   onClickOk={onClickDeleteUser}
                   message={t('Are you sure to delete your account?')}
                   pendingApiCall={pendingApiCallDeleteUser}
                   title={t('Delete My Account')}
                   okButton={t('Delete My Account')}
            />
        </div>
    );

};

export default ProfileCart;
