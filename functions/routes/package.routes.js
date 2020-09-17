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

    }).get('/download/:name', async (req, res) => {
        const response = await packageController.getPackageFileForDownload(req);
      try {
        if (response.result.meta.code === 200) {
            const stream = response.stream;
            res.writeHead(200, { 'Content-Type': 'application/octet-stream','Content-Disposition': 'attachment; ; filename=package.xvba' });
            stream.on('data', function (data) {
                res.write(data);
            });

            stream.on('error', function (err) {
                console.log('error reading stream', err);
            });

            stream.on('end', function () {
              
                res.end();
            });
        } else {
            res.status(response.meta.code).json(response);
        }
      } catch (error) {
        res.send(error)
      }
      


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