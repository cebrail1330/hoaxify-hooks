import React, {Component} from 'react';
import UserList from "../components/UserList";

class HomePage extends Component {
    render() {
        return (
            <div className="container">
                <UserList></UserList>
            </div>
        );
    }
}

export default HomePage;
