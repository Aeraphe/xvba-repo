const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');


async function getPostValues(req) {

    const busboy = new Busboy({ headers: req.headers });
    // This object will accumulate all the fields, keyed by their name
    let fields = {};
    // This code will process each non-file field in the form.
    busboy.on('field', (fieldname, val) => {
        fields[fieldname] = JSON.parse(val);
    });

    const dataPromise = new Promise(
        (resolve, reject) => {
            busboy.on('finish', () => {
                resolve(fields);
            })

        }
    )

    busboy.end(req.rawBody);
    return dataPromise;

}



async function processPostedFiles(req) {
    const busboy = new Busboy({ headers: req.headers });
    const fileWrites = [];
    const tmpdir = os.tmpdir();
    // This object will accumulate all the uploaded files, keyed by their name.
    const uploads = [];
    // This code will process each file uploaded.
    busboy.on('file', (fieldname, file, filename) => {
        // Note: os.tmpdir() points to an in-memory file system on GCF
        // Thus, any files in it must fit in the instance's memory.

        const filepath = path.join(tmpdir, filename);
        uploads.push({file:filepath,name:fieldname});

        const writeStream = fs.createWriteStream(filepath);
        file.pipe(writeStream);

        // File was processed by Busboy; wait for it to be written.
        // Note: GCF may not persist saved files across invocations.
        // Persistent files must be kept in other locations
        // (such as Cloud Storage buckets).
        const promise = new Promise((resolve, reject) => {
            file.on('end', () => {
                writeStream.end();
            });
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });


        fileWrites.push(promise);
    });

    const dataPromise = new Promise(
        (resolve, reject) => {
            busboy.on('finish', () => {
                resolve([fileWrites, uploads]);
            })

        }
    )

    busboy.end(req.rawBody);
    return dataPromise
}


async function getFiles(req, success) {

    const busboy = new Busboy({ headers: req.headers });
    const [fileWrites, uploads] = await processPostedFiles(req);
    // Triggered once all uploaded files are processed by Busboy.
    // We still need to wait for the disk writes (saves) to complete.
    const files = new Promise(

        (resolve, reject) => {
            busboy.on('finish', async () => {
                await Promise.all(fileWrites);
                resolve(uploads)
            });

        }
    )

    busboy.end(req.rawBody);
    return files
}





module.exports =  {getPostValues,getFiles};

