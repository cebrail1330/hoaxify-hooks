import React from 'react';
import UserSignupPage from "../pages/UserSignupPage"
import LoginPage from '../pages/LoginPage'
import LanguageSelector from '../components/LanguageSelector'
import HomePage from "../pages/HomePage"
import UserPage from "../pages/UserPage"
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import TopBar from '../components/TopBar';
import {useSelector} from "react-redux";


const App = () => {
    const {isLoggedIn} = useSelector(store => ({
        isLoggedIn: store.isLoggedIn
    }))
    return (
        <div>
            {/* browserrouter backend sorgularını tetikler  */}
            <Router> {/*HashRouter =>Route'lar çalıştığında backend'de istek atmaz cliendda olur herşey  */}
                <TopBar/>
                <Switch> {/*switch olmazsa en attıki redirect 'de çalışır süürekli anasayfaya gider  */}
                    <Route exact path="/" component={HomePage}/>
                    {!isLoggedIn && <Route path="/login" component={LoginPage}/>}
                    <Route path="/signup" component={UserSignupPage}/>
                    <Route path="/user/:username" component={UserPage}/>
                    <Redirect to="/"/> {/** burdak route'lardan hiç birisine girmezse burası çalışsacak */}
                </Switch>

            </Router>

            <LanguageSelector></LanguageSelector>

        </div>
    );

}

export default App;
