const semver = require('semver')
const PackageRepository = require('../repository/package.repository');


const checkVersion = async (newPackageVersion,packageCompareId)=>{
    const {  getPackageLastVersionDetails } = PackageRepository;

    if (semver.valid(newPackageVersion) !== null) {
       
        const packageVersionDetails =await  getPackageLastVersionDetails(packageCompareId)
   

        if (semver.gt(newPackageVersion, packageVersionDetails.version.version)) {

            return true;
        } else {
            const error = new Error(`The new Package version ( ${newPackageVersion} ) is lower or equal than the last ( ${packageVersionDetails.version.version} )  Valid`)
            error.code = "404";
            throw error
        }
    } else {
        console.log("ddd")
        const error = new Error('Package version format is not Valid (' + newPackageVersion + ")")
        error.code = "404";
        throw error
    }
}


module.exports = {checkVersion}