/**
 * XVBA repository api
 * @author Alberto Eduardo  alberto.aeraph@yahoo.com
 * @since 07/09/2020
 * 
 */
const  bodyParser = require('body-parser');
const  express = require('express');
const functions = require('firebase-functions');
var cors = require('cors')
//Routes
const userRoutes = require('./routes/user.routes');
const packageRoutes = require('./routes/package.routes') ;

//Start Firestore Admin
require('./firestore.init');



let app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

module.exports.api = functions.https.onRequest(app);

//Load api Routes
app.use('/v1/users',userRoutes)
app.use('/v1/packages',packageRoutes);

