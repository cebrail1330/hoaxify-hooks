import {applyMiddleware, compose, createStore} from "redux";
import authReducer from "./authReducer";
import SecureLS from "secure-ls"; //npm install SecurLs
import thunk from "redux-thunk";
import {setAuthorizationHeader} from "../api/apiCalls";
//consoldaki oluşturulan verinin gizlenmesi için
const secureLs = new SecureLS();

const getStateFromStorage = () => {
    //sayfa yenilendiğinde veriler kaybolmaması için
    const hoaxauth = secureLs.get('com.hoaxify.ws.hoax-auth');

    //localStorage'da herhangi bir bilgi yoksa
    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        image: undefined,
        password: undefined
    }
    if (hoaxauth) { //bir veri varsa localStorage'daki bilgiyi alacak
        return hoaxauth
    }
    return stateInLocalStorage
}

const updateStateInstorage = (newState) => {
    // store'ın özelliğini kullanarak değişimleri key'le beraber localStorage'ye attık
    secureLs.set('com.hoaxify.ws.hoax-auth', newState)
}

const configureStore = () => {
    const initialState = getStateFromStorage();
    setAuthorizationHeader(initialState)
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

    //storedaki değişimlerin haberdar olmamız için
    store.subscribe(() => {
        updateStateInstorage(store.getState());
        setAuthorizationHeader(store.getState());

    });

    return store;
}

export default configureStore;
