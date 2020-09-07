/**
 * Package Routes
 * @version v1 
 */
const express = require('express');
const packageController = require('../controller/package.controller');
const router = express.Router();



router
    .post('/', async (req, res) => {
        const response = await packageController.addPackage(req)
        res.send(JSON.stringify(response));
    }).get('/', async (req, res) => {
        const response = await packageController.getPackage();
        res.json(response);
    })

module.exports = router