import React, {useEffect, useState} from "react";
import Input from "../components/Input";
import {useTranslation} from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress"
import {useApiProgress} from "../shared/ApiProgress";
import {loginHandler} from "../redux/authActions";
import {useDispatch} from "react-redux";

//import { Authentication } from "../shared/AuthenticationContext"

const LoginPage = (props) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    //redux'daki connect'i hooksla kullanmanın yolu
    const dispatch = useDispatch();

    //iki parametre ister ilki çağrılacak fonksiyon ikinci o fonksiyonu ne tetikleyecek
    useEffect(() => { //bir etki olduğunda tetiklenecek fonksiyon
        setError(undefined)
    }, [username, password]);

    const onClickLogin = async (event) => {
        event.preventDefault();

        const creds = {
            username,
            password,
        };
        const {history} = props
        const {push} = history;
        setError(undefined);
        try {
            await dispatch(loginHandler(creds));

            push('/') //giriş yapıldıkta sonra anasayfaya dönecek
        } catch (apiError) {
            setError(apiError.response.data.message);
        }
    };
    const {t} = useTranslation();

    const pendingApiCall = useApiProgress('post', '/api/1.0/auth');

    const buttonEnabled = username && password
    return (
        <div className="container">
            <form>
                <h1 className="text-center">{t("Login")}</h1>
                <Input
                    name="username"
                    label={t("Username")}
                    onChange={event => setUsername(event.target.value)}
                ></Input>
                <Input
                    name="password"
                    label={t("Password")}
                    type="password"
                    onChange={event => setPassword(event.target.value)}
                ></Input>
                {error && <div className="alert alert-danger">
                    {error}
                </div>}
                <div className="text-center">
                    <ButtonWithProgress
                        className="btn btn-primary"
                        type="submit"
                        onClick={onClickLogin}
                        disabled={!buttonEnabled || pendingApiCall}
                        pendingApiCall={pendingApiCall}
                        text={t('Login')}
                    />
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
