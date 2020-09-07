import { auth } from 'firebase';
import { login, logout } from "../reducers/authenticationSlice";



export const loginFirebase = async (email, pass, dispatch) => {
    try {
        const logData = await auth().signInWithEmailAndPassword(email, pass);
        const token = (await logData.user.getIdTokenResult()).token;
        const expirationTime = (await logData.user.getIdTokenResult()).expirationTime;
        dispatch(login({ token, expirationTime }))
    } catch (error) {
        console.error(error.message);
    }

}

export const logoutFirebase = async (dispatch) => {
    try {
        await auth().signOut();
        dispatch(logout());
    } catch (error) {
        console.error(error.message);
    }
}

export const register = async (name, email, password) => {
    await auth().createUserWithEmailAndPassword(email, password);
    return auth().currentUser.updateProfile({
        displayName: name
    })
}

export const getCurrentUser = () => {
    return auth().currentUser ? auth().currentUser : undefined
}



