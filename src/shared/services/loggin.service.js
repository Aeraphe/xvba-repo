import app from 'firebase/app';


class FirebaseLoginService {

    constructor() {
        this.auth = app.auth();
    }

    async login(email, pass) {
        return await this.auth.signInWithEmailAndPassword(email, pass);

    }

    async logout() {
        return await this.auth.signOut();
    }

    async register(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password);
        return this.auth.currentUser.updateProfile({
            displayName: name
        })
    }

    getCurrentUser() {
        return this.auth.currentUser ? this.auth.currentUser : undefined
    }

}


export default new FirebaseLoginService();