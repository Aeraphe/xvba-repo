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

export const createAccount = async (data, dispatch) => {
    try {
        const response = await auth().createUserWithEmailAndPassword(data.email, data.password);
        await auth().currentUser.updateProfile({
            displayName: data.name
        })
        const token = (await response.user.getIdTokenResult()).token;
        const expirationTime = (await response.user.getIdTokenResult()).expirationTime;
        dispatch(login({ token, expirationTime }))
        return response
    } catch (error) {
        console.error(error)
    }

}

export const getCurrentUser = () => {
    return auth().currentUser ? auth().currentUser : undefined
}



