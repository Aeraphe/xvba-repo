const admin = require('../firestore.init');
const db = admin.firestore();
const Fuse = require('fuse.js');
const packagesRef = db.collection('packages');

const savePackage = async (data, version, packageVersionData) => {
    const packageDoc = await packagesRef.add(data)
    const packRef = packagesRef.doc(packageDoc.id).collection('versions').doc(version);
    return await packRef.set(packageVersionData)
}



const getAllUserPackages = async (req) => {
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

const getPackageById = async (packageId) => {

    let query = db.collection('packages').doc(packageId);
    let doc = [];
    return await query.get().then(docRef => {
        doc.push({ ...docRef.data(), id: packageId })
        return doc
    })

}


const addPackageVersion = async (packageId, data) => {
    let packageRef = db.collection('packages').doc(packageId);
    let versionRef = packageRef.collection('versions').doc(data.vn);
    await versionRef.set(data).then(resp => resp);
    return await packageRef.update({ version: data }).then(resp => resp)

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
                        querySnapshot.forEach(async (doc) => {

                            if (version !== 'latest') {

                                await db.collection('packages').doc(doc.id).collection('versions').where('vn', '==', version).get().then(
                                    d => {

                                        d.forEach(f => {
                                            const pack = doc.data();
                                            delete pack.version
                                            docs.push({ ...pack, id: doc.id, version: f.data() })
                                        })
                                        resolve(docs);
                                    }
                                );

                            } else {
                                //Get latest version
                                docs.push({ ...doc.data(), id: doc.id });
                                resolve(docs);
                            }

                        })
                    }
                )

            }
        )

    }

}


const getPackageLastVersionDetails = async (docId) => {

    return await db.collection('packages').doc(docId).collection('versions').orderBy('create_ate', 'desc').limit(1).get().then(
        querySnapshot => {
            let response;
            querySnapshot.forEach(f => {

                response = { id: docId, version: f.data() }
            })
            return response;
        }
    );
}


//Check Package version string request
const splitPackageNameVersion = (nameVersion) => {
    const nameVersionSplit = nameVersion.split('@');
    const regexVersionFormat = new RegExp(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/,"gm");
  
    if (regexVersionFormat.test(nameVersionSplit[1])) {
        const version = nameVersionSplit[1].match(/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/gm);
        return { version: version !== null ? version[0] : 'latest', name: nameVersionSplit[0] }
    } else {
        return { version: 'latest', name: nameVersion }
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

    return db.collection('packages').get().then(
        async (querySnapshot) => {
            let packages = [];
            for (const doc of querySnapshot.docs) {
                const fuse = new Fuse([doc.data()], options)
                const find = fuse.search(req.body.name)
                if (find.length > 0 && find[0].score <= 0.2) {

                    packages.push({ ...find[0].item, id: doc.id })

                }
            }

            return packages
        }

    );

}

module.exports = {
    savePackage,
    getAllUserPackages,
    deletePackage,
    fuseSearchPackages,
    getPackageByNameAndVersion,
    getPackageLastVersionDetails,
    addPackageVersion,
    getPackageById
}