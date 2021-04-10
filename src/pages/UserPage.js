import React, {useEffect, useState} from 'react';
import ProfileCart from "../components/ProfileCart";
import {getUser} from "../api/apiCalls";
import {useTranslation} from "react-i18next";
import Spinner from "../components/Spinner";
import {useParams} from "react-router-dom";

const UserPage = (props) => {

    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);
    const {username} = useParams()  // || props.match.params
    const {t} = useTranslation();

    const pendingApiCall =
        ('get', '/api/1.0/users/' + username);

    useEffect(() => { //userlar gelirse hata gösterilmeyecek
        setNotFound(false);
    }, [user]);

    useEffect(() => {
        //componentDidMound mantığında çalışacak
        const loadUser = async () => {
            try {
                //gelen user'ı backend'e gönderecek
                const response = await getUser(username);
                setUser(response.data);
            } catch (error) {
                setNotFound(true);
            }
        }
        loadUser();
    }, [username])

    if (pendingApiCall) {
        <Spinner/>
    }
    if (notFound) {
        return (
            <div className="container">

                <div className="alert alert-danger text-center">
                    <div>
                        <i className="material-icons alert-danger"
                           style={{fontSize: '48px'}}>error</i>
                    </div>

                    {t('User not Found')}
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            <ProfileCart user={user}/>
        </div>
    );
}

export default UserPage;
