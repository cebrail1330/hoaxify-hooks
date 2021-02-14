import React, {Component} from 'react';
import {getUsers} from "../api/apiCalls";
import {withTranslation} from "react-i18next";
import UserListItem from "./UserListItem";

class UserList extends Component {
    state = {
        page: {
            content: [],
            page: 0,
            size: 3
        }
    }

    componentDidMount() {
        this.loadUsers();//bu şekillde çağrılırda default değerlerle çalışacak

    }

    onClickNext = () => {
        const nextPage = this.state.page.number + 1;
        this.loadUsers(nextPage);
    }
    onClickPrevious = () => {
        const previousPage = this.state.page.number - 1;
        this.loadUsers(previousPage);
    }

    loadUsers = page => {
        getUsers(page).then(response => {
            this.setState({
                page: response.data
            })
        })
    }

    render() {
        const {content: users, last, first} = this.state.page; //content: users content'in yeni ismi
        const {t} = this.props;
        return (
            <div className="card">
                <h3 className="card-header text-center">{t('Users')}</h3>
                <div className="list-group-flush">
                    {
                        users.map(user => (
                            <UserListItem key={user.username} user={user}/>
                        ))
                    }
                </div>
                <div>
                    {/* sayfalandırma arası geçiş page'nin içinde first last geliyor*/}
                    {first === false &&
                    <button className="btn btn-sm btn-light" onClick={this.onClickPrevious}>{t('Previous')}</button>}

                    {/**last === false bu kontrol olmazsa eğer backend'den hiç bir sonuç gelmezse yine false olur*/}
                    {last === false &&
                    <button className="btn btn-sm btn-light float-right"
                            onClick={this.onClickNext}>{t('Next')}</button>}
                </div>

            </div>
        );
    }

}

export default withTranslation()(UserList);
