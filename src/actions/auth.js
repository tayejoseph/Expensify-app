import { firebase, googleAuthProvider } from "../firebase/firebase";

export const login = (uid) => ({
    type: "LOGIN",
    uid
});

export const startLogin = () => {
    return () => {
        //this tell firebase authentication to create a google popup login page
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};


export const logout = () => ({
    type: "LOGOUT"
});

export const startLogout = () => {
    return () => {
        //this is for signining out the page
        return firebase.auth().signOut();
    };
};