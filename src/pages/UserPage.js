import React, {useEffect, useState} from 'react';
import ProfileCart from "../components/ProfileCart";
import {getUser} from "../api/apiCalls";

const UserPage = (props) => {

    const [user, setUser] = useState();
    const {username} = props.match.params // || useParams()

    useEffect(() => {
        //componentDidMound mantığında çalışacak
        const loadUser = async () => {
            try {
                //gelen user'ı backend'e gönderecek
                const response = await getUser(username);
                setUser(response.data);
            } catch (error) {

            }
        }

        loadUser();
    }, [username])


    return (
        <div className="container">
            <ProfileCart/>
        </div>
    );
}

export default UserPage;
