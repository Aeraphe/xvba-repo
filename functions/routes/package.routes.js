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
        res.json(response);
    }).get('/', async (req, res) => {
        const response = await packageController.getPackage();
        res.json(response);
    }).post('/search', async (req, res) => {
        const response = await packageController.searchPackages(req);
        res.json(response);

    }).post('/check-name', async (req, res) => {
        const response = await packageController.searchPackageName(req);
        res.json(response, response.meta.code);

    })

module.exports = router