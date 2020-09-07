
const  bodyParser = require('body-parser');
const  express = require('express');
const functions = require('firebase-functions');
//Routes
const userRoutes = require('./routes/user.routes');
const packageRoutes = require('./routes/package.routes') ;
require('./firestore.init');



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))



module.exports.api = functions.https.onRequest(app);

app.use('/v1/users',userRoutes)
app.use('/v1/packages',packageRoutes);

