/**
 * Package Controller
 * @author Alberto Eduardo alberto.aeraph@gmail.com
 */
const admin = require('../firestore.init');
const db = admin.firestore();
const Response = require('../response/response_api');
const FileUploadServices = require('../services/file_upload.service');
const StorageService = require('../services/storage.service');
const PackageRepository = require('../repository/package.repository');
const moment = require('moment')


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
            const filesStorage = await storePackage(files, { destination: "xvba-files/" + userId, append_name: '_xvba_package' });
            const { savePackage } = PackageRepository;
            await savePackage(
                {
                    user_id: userId,
                    ...data.data,
                    file: filesStorage[0].rename,
                    rating: 0,
                    downloads: 0,
                    create_ate: moment(Date()).format('MM/DD/YYYY'),
                    public: true
                })
            return Response.format(data.data, req, { code: 200, message: 'Package Upload Successfully' });
        } catch (error) {
            return Response.format([], req, { code: error.code, message: error.message });
        }

    },


    deletePackage: async (req) => {
        try {

            const { deletePackage, getUserPackages } = PackageRepository;
            const { deletePackageFile } = StorageService;
            const userPackages = await getUserPackages(req);
            const user_id = req.user.user_id;
            //Check if the user is the package owner 
            const pack = userPackages.filter(item => item.id === req.params.id);
            if (pack) {
               await deletePackageFile(user_id,pack[0].file)
               await deletePackage(req)

            }

            return Response.format([], req, { code: 200, message: 'Package Delete Successfully' });
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
        const { fuseSearchPackages } = PackageRepository;
        try {
            const packages = await fuseSearchPackages(req)
            return Response.format(packages, req, { code: 200, message: 'Data Found' });

        } catch (error) {
            return Response.format([], req, { code: error.code, message: error.message });
        }

    }
}


