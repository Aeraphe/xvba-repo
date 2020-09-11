/**
 * Package Controller
 * @author Alberto Eduardo alberto.aeraph@gmail.com
 */
const admin = require('../firestore.init');
const db = admin.firestore();
const Response = require('../response/response_api');
const Fuse = require('fuse.js')
const uploadFiles = require('../upload/uploadService');
const {Storage} = require('@google-cloud/storage');


// Instantiate a storage client
const storage = new Storage();

// A bucket is a container for objects (files).
const bucket = storage.bucket("bucket1");




module.exports = {
    getPackage: async () => {
        let packages = [];
        await db.collection('packages').get().then(function (querySnapshot) {

            querySnapshot.forEach(function (doc) {
                packages.push({ id: doc.id, package: doc.data() })

            });

        })
        return packages;
    },
    /**
     * @param {Request} req
     */
    addPackage: async (req) => {
        const {getPostValues,saveFiles} = uploadFiles;
        const data = await getPostValues(req);
        saveFiles(req);
        return data;
    },


    searchPackageName: async (req) => {

        let packages = []
        try {
            const packagesRef = db.collection('packages');
            let query = packagesRef.where('name', '==', req.body.name).limit(1);
            await query.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    packages.push({ id: doc.id, package: doc.data() })
                });
            });

            return Response.format(packages, req, { code: 200, message: 'Data Found' });
        } catch (error) {
            return Response.format([], req, { code: error.code, message: error.message });
        }


    },

    /**
 * @param {Request} req
 */
    fuseSearchPackages: async (req) => {
        let packages = [];
        const options = {
            includeScore: true,
            keys: ['name']
        }
        try {
            await db.collection('packages').get().then(
                (querySnapshot) => {

                    querySnapshot.forEach(doc => {
                        const fuse = new Fuse([doc.data()], options)
                        const find = fuse.search(req.body.name)
                        if (find.length > 0 && find[0].score <= 0.2) { packages.push({ package: find[0].item, id: doc.id }) }
                    })
                }

            );
            return Response.format(packages, req, { code: 200, message: 'Data Found' });

        } catch (error) {
            return Response.format([], req, { code: error.code, message: error.message });
        }

    }
}


