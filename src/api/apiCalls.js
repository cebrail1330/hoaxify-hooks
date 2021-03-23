import axios from "axios";

export const signup = (body) => {
    return axios.post("/api/1.0/users", body);
};

export const login = creds => {
    {
        return axios.post('/api/1.0/auth', {}, {auth: creds});
    }
}
export const changeLanguage = (language) => {
    //axiosın headerlerine bütün headerlerde ulaşacak ayar
    axios.defaults.headers["accept-language"] = language;
};

export const getUsers = (page = 0, size = 3) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
}

export const setAuthorizationHeader = ({username, password, isLoggedIn}) => {
    if (isLoggedIn) {
        //btoa username ve passwordubase64'e çevirir
        //username ve passwordu birleştirir
        const authorizationHeaderValue = `Basic ${btoa(username + ':' + password)}`;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else {
        //kullanıcı çıkış yaptıktan sonra kullanıcılar listesinde adı görünecek
        delete axios.defaults.headers['Authorization']
    }

}


export const getUser = username => {
    return axios.get(`/api/1.0/users/${username}`)
}

