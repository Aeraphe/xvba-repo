/**
 * Package Controller
 * @author Alberto Eduardo alberto.aeraph@gmail.com
 */
const admin = require('../firestore.init');
const db = admin.firestore();

module.exports = {
    getPackage: async () => {
        let packages = [];
        await db.collection('packages').get().then(function (querySnapshot) {

            querySnapshot.forEach(function (doc) {
                packages.push({ id: doc.id, package: doc.data() })

            });

        })
        return packages;
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


