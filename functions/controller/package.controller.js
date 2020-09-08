/**
 * Package Controller
 * @author Alberto Eduardo alberto.aeraph@gmail.com
 */
const admin = require('../firestore.init');
const db = admin.firestore();
const Response = require('../response/response_api');
const Fuse = require('fuse.js')

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
        //upload file
        const response = await db.collection('packages').add(req);
        return response
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
    searchPackages: async (req) => {
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


