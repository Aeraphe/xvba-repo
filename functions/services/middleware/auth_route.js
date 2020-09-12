const admin = require('../../firestore.init');

const authRoute = async (req, res, next) => {
    try {
        const tokenId = req.get('Authorization').split('Bearer ')[1];
        const t = await admin.auth().verifyIdToken(tokenId)
        if (t) {
            next()
        } else {
            res.json({ message: 'Token invalid' })
        }
    } catch (error) {
        res.json({ message: error })
    }

}


module.exports = authRoute;