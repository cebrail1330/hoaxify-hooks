import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import ProfileImageWithDefault from "./ProfileImageWithDefault";
import {useTranslation} from "react-i18next";
import Input from "./Input";
import {updateUser} from "../api/apiCalls";
import {useApiProgress} from "../shared/ApiProgress";
import ButtonWithProgress from "./ButtonWithProgress";
import {updateSuccess} from "../redux/authActions";
//userpage.js deki props bilgilerini alacak

const ProfileCart = (props) => {
    const [inEditMode, setInEditMode] = useState(false);
    const [newImage, setNewImage] = useState();
    const [user, setUser] = useState({});
    const [editable, setEditable] = useState(false)
    const [validationErrors, setValidationErrors] = useState({});
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const {username, displayName, image} = user;
    const dispatch = useDispatch();


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
                        {editable &&
                        <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)}>
                            {t('Edit')}
                            <i className="material-icons">edit</i>
                        </button>}
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

        </div>
    );

};

export default ProfileCart;
