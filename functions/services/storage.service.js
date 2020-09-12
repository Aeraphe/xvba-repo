const admin = require('firebase-admin');
const fs = require('fs');
let bucketName = "xvba-691e3.appspot.com";
const bucked = admin.storage().bucket(bucketName)


const storePackage = async (uploads) => {
    let resp;

    const store = new Promise(
        (resolve, reject) => {
            try {
                uploads.forEach(async element => {
                    let fileName = "xvba-files/" + Date.now() + '_package.xvba';
                    resp = await bucked.upload(
                        element.file, {
                        destination: fileName
                    }).then( (result) => {
                        fs.unlinkSync(element.file);
                  
                        return  result
                    })
                });
                resolve(resp)
            } catch (error) {
                reject(error)
            }

        }
    )
    return store
}




module.exports = { storePackage }