import jwt from'jsonwebtoken';
import firebase from '../firebase';
import moment from 'moment';

const login = async (email, password) => {
    const response = await firebase.loginWithEmailAndPassword(email, password);
    const user = firebase.currentUser();
    const token = response.user.xa;

    return createCookie(user.uid, user.email, token);;
}

const register = async (email, password) => {
    const response =await firebase.registerWithEmailAndPassword(email, password);
    const user = firebase.currentUser();
    const token = response.user.xa;

    return createCookie(user.uid, user.email, token);
}

const logout = async () => {
    await firebase.logOut();

    return deleteCookie();
}

const generateToken = user => {
    const token = jwt.sign(user, process.env.REACT_APP_JWT_PRIVATE_KEY);

    return token;
}
console.log();
const createCookie = (uId, email, token) => {
    const jwtToken = generateToken({
        uId: uId,
        email: email,
        token: token
    });
    
    document.cookie = "aid= " + (jwtToken || "") + "; expires = " + moment().add(1, 'hours').toDate() + "; path=/;";

    return jwtToken;
};

const deleteCookie = () => {
    document.cookie = "aid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/";
};

const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');

    return cookieValue ? cookieValue[2] : null;
}

const getAllFromCookie = () => {
    const cookieValue = getCookie('aid');
    try {
        const decodeObject = jwt.verify(cookieValue, process.env.REACT_APP_JWT_PRIVATE_KEY);
        
        return {
            uid: decodeObject.uId,
            email: decodeObject.email,
            token: decodeObject.token
        }
    } catch (e) {
        return false;
    }
}

const isLoggedIn = () => {
    const cookieValue = getCookie('aid');
    try {
        jwt.verify(cookieValue, process.env.REACT_APP_JWT_PRIVATE_KEY);
        console.log(true)
        return true;
    } catch (e) {
        console.log(false)
        return false;
    }
};


export default {
    login,
    register,
    logout,
    isLoggedIn,
    getCookie,
    getAllFromCookie
};