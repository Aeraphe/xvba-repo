const admin = require('../firestore.init');
const db = admin.firestore();

const packagesRef = db.collection('packages');

const savePackage = async (data) => {


    return await packagesRef.add(data)

}

const getUserPackages = async (req) => {
    const userId = req.user.user_id;
    let query = packagesRef.where('user_id', '==', userId);
    let docs = [];
    return await query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            docs.push(doc.data())
        });
        return docs;
    });


}

module.exports = { savePackage, getUserPackages }