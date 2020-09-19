//const extract = require('extract-zip')
const { promisify } = require('util');
const os = require('os');
const path = require('path');
const fs = require('fs');
const { toLower } = require('lodash');
const readFileAsync = promisify(fs.readFile);
const statAsync = promisify(fs.stat);
const decompress = require('decompress');

//Unzip file for separate Readme.md
//Check file extension
//Check file size
const checkPackageFilesService = async (files, packageData) => {
    try {

        const tmpFolderName = Date.now() + '_xvba';
        const packageTempfolderPath = path.join(os.tmpdir(), tmpFolderName);
        //Extract filet to temp folder
         await decompress(files[0].file,  packageTempfolderPath );
        //Check config file (xvba.package.json)
        const xvbaConfigFile = await checkConfigFile(packageData, packageTempfolderPath)
        //Develope
        await checkReadmeFile(packageTempfolderPath)
        //Check if package has just one index.cl (Root Class) and just one method with the same name of the package
        const response = {
            'config': xvbaConfigFile,
            'tempFolder': packageTempfolderPath,
            fileReadme: { file: path.join(packageTempfolderPath, 'README.md') }
        }
        return response;

    } catch (error) {
        console.log(error)
    }


}


const checkReadmeFile = async (packageTempfolderPath) => {
    const filePath = path.join(packageTempfolderPath, 'README.md')
    return await statAsync(filePath);

}

const checkConfigFile = async (packageData, packageTempfolderPath) => {
    const filePath = path.join(packageTempfolderPath, 'xvba.package.json')
    //Read xvba.package.json
    const xvbaConfigFile = await readFileAsync(filePath)
        .then(r => JSON.parse(r)).catch(r => { return 'File xvba.package.json not found' })
    //Check if the json package name is the same for the post values
    const packageName = toLower(packageData.name)
    if (toLower(xvbaConfigFile.package) !== packageName) {
        throw new Error("Yor package name doesn't match with xvba.package.json ")
    }

    return xvbaConfigFile
}




module.exports = { checkPackageFilesService }