import { auth } from 'firebase';


class FirebaseLoginService {


    async login(email, pass) {
        return await auth().signInWithEmailAndPassword(email, pass);

    }

    async logout() {
        return await auth().signOut();
    }

    async register(name, email, password) {
        await auth().createUserWithEmailAndPassword(email, password);
        return auth().currentUser.updateProfile({
            displayName: name
        })
    }

    getCurrentUser() {
        return auth().currentUser?auth().currentUser:undefined
    }

}


export default new FirebaseLoginService();