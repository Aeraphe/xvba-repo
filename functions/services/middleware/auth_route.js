const admin = require('../../firestore.init');

const authRoute = async (req, res, next) => {
    try {
        const tokenId = req.get('Authorization').split('Bearer ')[1];
        const currentUser = await admin.auth().verifyIdToken(tokenId)
        if (currentUser) {
            req.user =currentUser
            next()
        } else {
            res.json({ message: 'Token invalid' })
        }
    } catch (error) {
        res.json({ message: error })
    }

}


module.exports = authRoute;