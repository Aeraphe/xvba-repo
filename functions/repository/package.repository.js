const admin = require('../firestore.init');
const db = admin.firestore();

const packagesRef = db.collection('packages');

const savePackage = async (data) => {


    return await packagesRef.add(data)

}

const getUserPackages = async (req) => {
    const userId = req.user.user_id;
    let query = packagesRef.where('user_id', '==', userId);
    return await query.get();
}

module.exports = { savePackage, getUserPackages }