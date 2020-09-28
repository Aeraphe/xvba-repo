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
const { checkVersion } = require('../services/check-version-validation')


module.exports = {

    getPackageFileForDownload: async (req) => {
        try {
            //Get packages by name
            const { getPackageByNameAndVersion } = PackageRepository
            const packageName = req.params.name;
            const pack = await getPackageByNameAndVersion(packageName);

            //Package not found 
            if (pack.length === 0) {
                return Response.format([], req, { code: 404, message: 'Package not found' });
            }
            //Check if the package is public
            const userId = '' // req.user.user_id;
            const downloadGuard = DownloadGuardService(pack, userId);
            if (downloadGuard) {
                let fileName = pack[0].version.file;
                console.log(fileName)
                let storage = admin.storage()
                let bucked = storage.bucket("xvba-repository.appspot.com");
                const stream = bucked.file('xvba-files/' + fileName).createReadStream();
                //Increment Download
                const increment = admin.firestore.FieldValue.increment(1);
                const packRef = db.collection('packages').doc(pack[0].id);
                packRef.update({downloads:increment})
                return { stream, result: { ...Response.format([], req, { code: 200, message: 'Download package' + packageName + " Successfully" }) } };
            } else {
                return Response.format([], req, { code: 403, message: 'Permission Denied' });
            }
        } catch (error) {
            console.error(error)
            return Response.format([], req, { code: error.code, message: error.message });

        }


    },
    getPackageReadme: async (req) => {
        try {
            //Get packages by name
            const { getPackageByNameAndVersion } = PackageRepository
            const packageName = req.params.name;
            const pack = await getPackageByNameAndVersion(packageName);

            //Package not found 
            if (pack.length === 0) {
                return Response.format([], req, { code: 404, message: 'Package not found' });
            }
            //Check if the package is public
            const userId = '' // req.user.user_id;
            const downloadGuard = DownloadGuardService(pack, userId);
            if (downloadGuard) {
                let fileName = pack[0].version.readme_file;
                let storage = admin.storage()
                let bucked = storage.bucket("xvba-repository.appspot.com");
                const stream = bucked.file('xvba-files/' + fileName).createReadStream();
                return { stream, result: { ...Response.format([], req, { code: 200, message: 'Download readme' + packageName + " Successfully" }) } };
            } else {
                return Response.format([], req, { code: 403, message: 'Permission Denied' });
            }
        } catch (error) {
            console.error(error)
            return Response.format([], req, { code: error.code, message: error.message });

        }


    },
    addNewPackageVersion: async (req) => {
        try {

            const { getPostValues, getFiles } = FileUploadServices;
            const { storePackage } = StorageService;
            const { addPackageVersion, getPackageById } = PackageRepository;
            const postData = await getPostValues(req);
            //Get upload file
            const files = await getFiles(req);
            //Check zip files
            const packageCheckedData = await checkPackageFilesService(files, postData.data);
            const userId = req.user.user_id;
            const packageId = postData.data.id;
            const oldPackage = await getPackageById(packageId);
            //Check if the user is the owner off the package
            const downloadGuard = DownloadGuardService(oldPackage, userId);
            //Get new package Version
            const newPackageVersion = packageCheckedData.config.version;
            
            //Check if the version is valid
            const isValidVersion = await checkVersion(newPackageVersion, oldPackage[0].version.vn)
     
            if (downloadGuard && isValidVersion) {
                const config = packageCheckedData.config;
                //Store package zip file
                const filesStoragePackage = await storePackage(files, { destination: "xvba-files", append_name: '_xvba_package' });
                //Storage Readme file 
                const filesStorageReadme = await storePackage([{ ...packageCheckedData.fileReadme }], { destination: "xvba-files", append_name: '_xvba_readme' });


                const createAt = Date.now();

                const packageVersion = {
                    vn: config.version,
                    file: filesStoragePackage[0].rename,
                    size: filesStoragePackage[0].size,
                    readme_file: filesStorageReadme[0].rename,
                    create_ate: createAt,
                };
      
                await addPackageVersion(packageId, packageVersion);

                return Response.format(postData.data, req, { code: 200, message: 'Package Upload Successfully' });
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
            const createAt = Date.now();

            const packageData = {
                user_id: userId,
                name: postData.data.name,
                description: postData.data.description,
                repository: config.repository || "",
                homepage: config.homepage || "",
                public: true,
                rating: 0,
                downloads: 0,
                version:{
                    vn: config.version,
                    file: filesStoragePackage[0].rename,
                    size: filesStoragePackage[0].size,
                    readme_file: filesStorageReadme[0].rename,
                    create_ate: createAt,
                },
                create_ate: createAt
            };
            const packageVersion = {
                vn: config.version,
                file: filesStoragePackage[0].rename,
                size: filesStoragePackage[0].size,
                readme_file: filesStorageReadme[0].rename,
                create_ate: createAt,
            };

            await savePackage(packageData, config.version, packageVersion);

            return Response.format(postData.data, req, { code: 200, message: 'Package Upload Successfully' });
        } catch (error) {
            return Response.format([], req, { code: error.code, message: error.message });
        }

    },


    deletePackage: async (req) => {
        try {

            const { deletePackage, getAllUserPackages } = PackageRepository;
            const { deletePackageFile } = StorageService;
            const userPackages = await getAllUserPackages(req);

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
            const { getAllUserPackages } = PackageRepository;
            const response = await getAllUserPackages(req);
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
            const data = packages.reduce((pre, next) => {
                delete next.user_id;
                pre.push(next);
                return pre;
            }, [])
            return Response.format(data, req, { code: 200, message: 'Data Found' });

        } catch (error) {
            return Response.format([], req, { code: error.code, message: error.message });
        }

    }
}


