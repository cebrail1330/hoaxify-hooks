import React, {useState} from "react";
import Input from "../components/Input";
import {useTranslation} from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress"
import {useApiProgress} from "../shared/ApiProgress";
import {signupHandler} from "../redux/authActions";
import {useDispatch} from "react-redux";


const UserSignupPage = (props) => {
    const [form, setForm] = useState({
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null
    })
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const onChange = (event) => {
        const {name, value} = event.target;

        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: undefined
        }));
        setForm((previousState) => ({
            ...previousState,
            [name]: value
        }));

    };

    const onClickSignup = async (event) => {
        event.preventDefault();
        const {username, displayName, password} = form;
        const {history} = props
        const {push} = history;
        const body = {
            username,
            displayName,
            password,
        };
        try {
            await dispatch(signupHandler(body));
            push('/')//anasayfaya gidece
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrors(error.response.data.validationErrors)
            }
        }
    };

    const {t} = useTranslation();//hooks
    const {username: usernameError, displayName: displayNameError, password: passwordError} = errors;
    const {pendingApiCallLogin} = useApiProgress('/api/1.0/auth');
    const {pendingApiCallSignup} = useApiProgress('/api/1.0/users');

    const pendingApiCall = pendingApiCallLogin || pendingApiCallSignup;
    let passwordRepeatError;
    if (form.password !== form.passwordRepeat) {
        passwordRepeatError = t('Password mismatch')
    }
    return (
        <div className="container">
            <form>
                <h1 className="text-center">{t("Sign Up")}</h1>
                <Input
                    name="username"
                    label={t("Username")}
                    error={usernameError}
                    onChange={onChange}
                />
                <Input
                    name="displayName"
                    label={t("Display Name")}
                    error={displayNameError}
                    onChange={onChange}
                />
                <Input
                    name="password"
                    type="password"
                    label={t("Password")}
                    error={passwordError}
                    onChange={onChange}
                />
                <Input
                    name="passwordRepeat"
                    type="password"
                    label={t("Password Repeat")}
                    error={passwordRepeatError}
                    onChange={onChange}
                />

                <div className="text-center">
                    <ButtonWithProgress
                        disabled={pendingApiCall || passwordRepeatError !== undefined}
                        type="submit"
                        onClick={onClickSignup}
                        pendingApiCall={pendingApiCall}
                        text={t("Sign Up")}
                    />
                </div>

            </form>
        </div>
    );
}


export default UserSignupPage;
