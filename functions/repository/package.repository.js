const admin = require('../firestore.init');
const db = admin.firestore();
const Fuse = require('fuse.js')
const packagesRef = db.collection('packages');

const savePackage = async (data, version, packageVersionData) => {
   const packageDoc =  await packagesRef.add(data)
    const packRef = packagesRef.doc(packageDoc.id).collection('versions').doc(version);
    return await packRef.set(packageVersionData)
}



const getUserPackages = async (req) => {
    const userId = req.user.user_id;
    let query = packagesRef.where('user_id', '==', userId);
    let docs = [];
    return await query.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            docs.push({ ...doc.data(), id: doc.id })
        });
        return docs;
    });

}


const getPackageByName = async (name) => {
    const packageName = name;
    let query = packagesRef.where('name', '==', packageName).limit(1);
    let docs = [];
    return await query.get().then(
        (querySnapshot) => {
            querySnapshot.forEach(doc => {
                docs.push({ ...doc.data(), id: doc.id })
            })
            return docs;
        }
    )


}


const deletePackage = async (req) => {
    console.log(req.params.id)
    let docRef = packagesRef.doc(req.params.id);
    return await docRef.delete().then(function () {
        console.log("Document successfully deleted!");
        return [];
    }).catch(function (error) {
        console.error("Error removing document: ", error);
        return error;
    });

}


const fuseSearchPackages = async (req) => {
    const db = admin.firestore();


    const options = {
        includeScore: true,
        keys: ['name']
    }

    return await db.collection('packages').get().then(
        (querySnapshot) => {
            let packages = [];
            querySnapshot.forEach(doc => {
                const fuse = new Fuse([doc.data()], options)
                const find = fuse.search(req.body.name)
                if (find.length > 0 && find[0].score <= 0.2) { packages.push({ ...find[0].item, id: doc.id }) }
            })
            return packages
        }

    );

}

module.exports = { savePackage, getUserPackages, deletePackage, fuseSearchPackages, getPackageByName }