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

    }).post('/update/:id', authRoute, async (req, res) => {
        const response = await packageController.addNewPackageVersion(req)
        res.json(response);

    }).get('/', async (req, res) => {
        const response = await packageController.getPackage(req);
        res.json(response);
    }).get('/download/:name', async (req, res) => {
        const data = await packageController.getPackageFileForDownload(req);
        handleDownloadFileStream(res, data)
    }).get('/readme/:name', async (req, res) => {
        const data = await packageController.getPackageReadme(req);
        handleTextFileStream(res, data)
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



const handleTextFileStream = async (res, response) => {

    try {
        if (response.result.meta.code === 200) {
            const stream = response.stream;

            stream.on('data', function (data) {
                const dataText = data.toString()
                res.send(dataText);
            });

            stream.on('error', function (err) {
                console.log('error reading stream', err);
            });

            stream.on('end', function (data) {
                //Develope Set download count 
                res.end();
            });
        } else {
            res.status(response.meta.code).json(response);
        }
    } catch (error) {
        res.send(error)
    }
}

const handleDownloadFileStream = async (res, response) => {

    try {
        if (response.result.meta.code === 200) {
            const stream = response.stream;
            res.writeHead(200, { 'Content-Type': 'application/octet-stream', 'Content-Disposition': 'attachment; ; filename=package.xvba' });
            stream.on('data', function (data) {
                res.write(data);
            });

            stream.on('error', function (err) {
                console.log('error reading stream', err);
            });

            stream.on('end', function () {
                //Develope Set download count 
                res.end();
            });
        } else {
            res.status(response.meta.code).json(response);
        }
    } catch (error) {
        res.send(error)
    }
}



module.exports = router