/**
 * Package Routes
 * @version v1 
 */
const express = require('express');
const packageController = require('../controller/package.controller');
const router = express.Router();
const authRoute = require('../services/middleware/auth_route')


router
    .post('/', authRoute, async (req, res) => {
        const response = await packageController.addPackage(req)
        res.json(response);
    }).get('/', async (req, res) => {
        const response = await packageController.getPackage(req);
        res.json(response);

    }).get('/user-auth', authRoute, async (req, res) => {
        const response = await packageController.getUserAuthPackages(req);
        res.json(response);

    }).post('/fuse-search', async (req, res) => {
        const response = await packageController.fuseSearchPackages(req);
        res.json(response);
    }).post('/search-name', async (req, res) => {
        const response = await packageController.searchPackageName(req);
        res.json(response, response.meta.code);

    }).delete('/:id', authRoute, async (req, res) => {
        const response = await packageController.deletePackage(req);
        res.json(response, response.meta.code);

    })

module.exports = router