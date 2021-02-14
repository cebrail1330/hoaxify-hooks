import React from 'react';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

//userpage.js deki props bilgilerini alacak

const ProfileCart = (props) => {
    const {username: loggedInUsername} = useSelector(store => ({
        username: store.username
    }))
    const routeParams = useParams();
    const pathUsername = routeParams.username;
    //const loggedInUsername = props.username;
    let message = "We cannot edit";
    if (pathUsername === loggedInUsername) { //url deki user bilgisi aynı mı kontrol edecek
        message = "We can edit"
    }
    return (
        <div>
            {message}
        </div>
    );

};

export default ProfileCart;
