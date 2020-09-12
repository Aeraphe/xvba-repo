/**
 * Package Controller
 * @author Alberto Eduardo alberto.aeraph@gmail.com
 */
const admin = require('../firestore.init');
const db = admin.firestore();
const Response = require('../response/response_api');
const Fuse = require('fuse.js')
const FileUploadServices = require('../services/file_upload.service');
const StorageService = require('../services/storage.service');
const PackageRepository = require('../repository/package.repository')


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
        try {
            const { getPostValues, getFiles } = FileUploadServices;
            const data = await getPostValues(req);
            //Check package name again
            const files = await getFiles(req);
            const { storePackage } = StorageService;
            //Developer
            //Unzip file for separate Readme.md
            //Check file extension
            //Check file size
            const userId = req.user.user_id;
            console.log(req.user)
            const filesStorage = await storePackage(files, { destination: "xvba-files/" + userId, append_name: '_xvba_package' });
            const { savePackage } = PackageRepository;
            await savePackage(
                {
                    user_id: userId,
                    ...data.data,
                    file: filesStorage[0].rename,
                    rating: 0,
                    downloads: 0,
                    create_at: Date(),
                    public: true
                })
            return Response.format(data.data, req, { code: 200, message: 'Package Upload Successfully' });
        } catch (error) {
            return Response.format([], req, { code: error.code, message: error.message });
        }

    },

    getUserAuthPackages: async (req) => {
        try {
            const { getUserPackages } = PackageRepository;
            const response = await getUserPackages(req);
            return Response.format(response, req, { code: 200, message: 'Package Finned Successfully' })
        } catch (error) {
            return Response.format([], req, { code: error.code, message: error.message });
        }
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


