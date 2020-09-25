const semver = require('semver')


const checkVersion = async (newPackageVersion,lastVersion)=>{


    if (semver.valid(newPackageVersion) !== null) {
       
       

        if (semver.gt(newPackageVersion, lastVersion)) {

            return true;
        } else {
            const error = new Error(`The new Package version ( ${newPackageVersion} ) is lower or equal than the last ( ${lastVersion} )  Valid`)
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