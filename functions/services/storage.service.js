const admin = require('../firestore.init');
const fs = require('fs');
const path = require('path');
let bucketName = "xvba-repository.appspot.com";




const corConf = [

]
admin.storage().bucket(bucketName).setCorsConfiguration(corConf)
const bucket = admin.storage().bucket(bucketName)

/**
 * 
 * @param {Array} files  [{file}]  - file path
 * @param {Object} options { destination,append_name}
 */
const storePackage = async (files, options) => {

    try {

        return new Promise(
            (resolve, reject) => {
                for (const element of files) {

                    let ext = path.extname(element.file);
                    const last_name = options.append_name ? options.append_name : "";
                    let fileName = Date.now() + last_name + ext;
                    //Get the file size
                    fs.stat(element.file, (error, stats) => {
                        if (error) {
                            reject(error)
                        }
                        bucket.upload(
                            element.file, {
                            destination: options.destination + "/" + fileName
                        }).then(() => {
                            fs.unlinkSync(element.file)
                            resolve(({ file: element.file, rename: fileName, destination: options.destination, size: stats.size }))

                        }).catch(
                            error => {
                                reject(error)
                            }
                        )
                    })

                };
            }
        )


    } catch (error) {
        console.log(error)
    }

}


const deletePackageFile = async (name) => {
    const filePath = "xvba-files/" + name;
    const file = bucket.file(filePath);
    return await file.delete().then(
        val => {
            return val;
        }
    ).catch(
        err => {
            return err;
        }
    )
}




module.exports = { storePackage, deletePackageFile }