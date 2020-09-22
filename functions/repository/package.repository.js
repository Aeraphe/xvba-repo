const admin = require('../firestore.init');
const db = admin.firestore();
const Fuse = require('fuse.js')
const packagesRef = db.collection('packages');

const savePackage = async (data, version, packageVersionData) => {
    const packageDoc = await packagesRef.add(data)
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

/**
 * Get package by name and version
 * 
 * @param {String} name 
 */
const getPackageByNameAndVersion = async (packageNameVersion) => {


    const { version, name } = splitPackageNameVersion(packageNameVersion);

    let docs = [];
    if (version !== null) {

        const packagesRef = db.collection('packages');
        let query = packagesRef.where('name', '==', name)

        return new Promise(
            async (resolve, reject) => {
                await query.get().then(
                    async (querySnapshot) => {
                        querySnapshot.forEach(async doc => {

                            if (version !== 'latest') {

                                await db.collection('packages').doc(doc.id).collection('versions').where('version', '==', version).get().then(
                                    d => {

                                        d.forEach(f => {
                                            docs.push({ ...doc.data(), id: doc.id, version: f.data() })
                                        })
                                        resolve(docs);
                                    }
                                );

                            } else {
                                //Get latest version
                                await db.collection('packages').doc(doc.id).collection('versions').orderBy('create_ate', 'desc').limit(1).get().then(
                                    d => {
                                        d.forEach(f => {
                                            docs.push({ ...doc.data(), id: doc.id, version: f.data() });
                                        })
                                        resolve(docs);
                                    }
                                );
                            }

                        })
                    }
                )

            }
        )

    }

}


//Check Package version string request
const splitPackageNameVersion = (nameVersion) => {
    const nameVersionSplit = nameVersion.split('@');
    const reg = new RegExp('@');
    if (reg.test(nameVersion)) {
        const version = nameVersionSplit[1].match(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/gm);
        return { version: version!==null?version[0]:'Not found', name: nameVersionSplit[0] }
    } else {
        return { version: 'latest', name: nameVersionSplit[0] }
    }

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

module.exports = { savePackage, getUserPackages, deletePackage, fuseSearchPackages, getPackageByNameAndVersion }