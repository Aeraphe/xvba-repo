const admin = require('firebase-admin');
const fs = require('fs');
const fsAsync = require("fs").promises;
const path = require('path');
let bucketName = "xvba-691e3.appspot.com";
const bucked = admin.storage().bucket(bucketName)


/**
 * 
 * @param {Array} files  [{file}]  - file path
 * @param {Object} options { destination,append_name}
 */
const storePackage = async (files, options) => {
    let resp = [];

    const store = new Promise(
        (resolve, reject) => {
            try {

                files.forEach(async element => {
                    let ext = path.extname(element.file);
                    const last_name = options.append_name ? options.append_name : "";
                    let fileName = Date.now() + last_name + ext;
                    //Get the file size
                    const stat = await fsAsync.stat(element.file)
                    let fileRenamed = await bucked.upload(
                        element.file, {
                        destination: options.destination + "/" + fileName
                    }).then(() => {
                        fs.unlinkSync(element.file);
                        resp.push({ file: element.file, rename: fileName, destination: options.destination, size: stat.size });
                        return resp
                    })
                    resolve(fileRenamed)
                });


            } catch (error) {
                reject(error)
            }

        }
    )
    return store
}


const deletePackageFile = async (name) => {
    const file = bucked.file(name);
    await file.delete().then(
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