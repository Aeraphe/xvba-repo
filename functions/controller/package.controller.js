
//functions/controller

/**
 * Package Controller
 */
const admin = require('../firestore.init');

const db = admin.firestore();
module.exports = {
    getPackage: async () => {
        return await db.collection('packages').get()
     },
    addPackage: async (req) => {
        const pack = {
            name: 'gauss-curve',
            file: 'gauss.xvba'
        }
        const response = await db.collection('packages').add(pack);
        return response
    }
}


