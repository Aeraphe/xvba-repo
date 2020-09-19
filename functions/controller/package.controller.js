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
const DownloadGuardService = require('../services/download.guard')
const { checkPackageFilesService } = require('../services/check-package-files.service');
const moment = require('moment')


module.exports = {

    getPackageFileForDownload: async (req) => {
        try {
            //Get packages by name
            const { getPackageByName } = PackageRepository
            const packageName = req.params.name;
            const pack = await getPackageByName(packageName);
            //Package not found 
            if (pack.length === 0) {
                return Response.format([], req, { code: 404, message: 'Package not found' });
            }
            //Check if the package is public
            const userId = '' // req.user.user_id;
            const downloadGuard = DownloadGuardService(pack, userId);
            if (downloadGuard) {
                let fileName = pack[0].file;
                let storage = admin.storage()
                let bucked = storage.bucket("xvba-repository.appspot.com");
                const stream = bucked.file('xvba-files/' + fileName).createReadStream();

                return { stream, result: { ...Response.format([], req, { code: 200, message: 'Download package' + packageName + " Successfully" }) } };
            } else {
                return Response.format([], req, { code: 403, message: 'Permission Denied' });
            }
        } catch (error) {
            return Response.format([], req, { code: error.code, message: error.message });
        }


    },
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
            //Develope
            //check again if package name exists

            const { getPostValues, getFiles } = FileUploadServices;
            const postData = await getPostValues(req);
            //Check package name again
            const files = await getFiles(req);
            //Check zip files
            const packageCheckedData = await checkPackageFilesService(files, postData.data);
            const { storePackage } = StorageService;
            const userId = req.user.user_id;
            const config = packageCheckedData.config;
            //Store package zip file
            const filesStoragePackage = await storePackage(files, { destination: "xvba-files", append_name: '_xvba_package' });
            //Storage Readme file 
            const filesStorageReadme = await storePackage([{ ...packageCheckedData.fileReadme }], { destination: "xvba-files", append_name: '_xvba_readme' });

            const { savePackage } = PackageRepository;

            const packageData = {
                user_id: userId,
                name: postData.data.name,
                description: postData.data.description,
                repository: config.repository || "",
                homepage: config.homepage || "",
                public: true,
                create_ate: moment(new Date()).format('MM/DD/YYYY')
            };
            const packageVersion = {
                version: config.version,
                file: filesStoragePackage[0].rename,
                size: filesStoragePackage[0].size,
                readme_file: filesStorageReadme[0].rename,
                rating: 0,
                downloads: 0,
                create_ate: moment(new Date()).format('MM/DD/YYYY'),
            };

            await savePackage(packageData, config.version, packageVersion);

            return Response.format(postData.data, req, { code: 200, message: 'Package Upload Successfully' });
        } catch (error) {
            return Response.format([], req, { code: error.code, message: error.message });
        }

    },


    deletePackage: async (req) => {
        try {

            const { deletePackage, getUserPackages } = PackageRepository;
            const { deletePackageFile } = StorageService;
            const userPackages = await getUserPackages(req);

            //Check if the user is the package owner 
            const pack = userPackages.filter(item => item.id === req.params.id);
            if (pack) {

                pack[0].packages.forEach(async element => {
                    await deletePackageFile(element.file)
                    await deletePackageFile(element.readme_file)
                });

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


