import axios from 'axios';
import * as endpoints from './endpoints';


const getAuthHeaderToken = () => {
    let token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
}


class PackagesHttpService {

    get = async () => {
        const config = getAuthHeaderToken();
        return await axios.get(endpoints.packages.url, config).then(
            res => res.data
        );

    };


    getPackageReadme = async (packageName) => {

        return await axios.get(endpoints.packages.file_readme + "/" + packageName).then(
            res => res.data
        );

    };

    getUserAuthPackages = async () => {
        const config = getAuthHeaderToken();
        return await axios.get(endpoints.packages.user_auth_packages, config).then(
            res => res.data
        );
    }

    uploadNewPackage = async (data, callback) => {
        const config = getAuthHeaderToken();
        let uploadConf = {

            headers: {
                ...config.headers,
                'Content-Type': `multipart/form-data;boundary=${data._boundary}`,
                'Access-Control-Allow-Origin': '*',

            },
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                console.log(percentCompleted)
            }
        }

        return await axios.post(endpoints.packages.url, data, uploadConf).then(
            res => {
                return res.data
            }
        )
    }


    uploadPackageFileUpdate = async (data, packageId) => {
        const config = getAuthHeaderToken();
        let uploadConf = {

            headers: {
                ...config.headers,
                'Content-Type': `multipart/form-data;boundary=${data._boundary}`,
                'Access-Control-Allow-Origin': '*',

            },
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                console.log(percentCompleted)
            }
        }

        return await axios.post(endpoints.packages.update + packageId, data, uploadConf).then(
            res => {
                return res.data
            }
        )
    }
    /**
     * Search for packages by name
     * 
     * @param {string} search 
     */
    fuseSearch = async (search) => {
        const config = getAuthHeaderToken();
        let data = { name: search }
        return await axios.post(endpoints.packages.url + '/fuse-search', data, config).then(
            res => {
                return res.data
            }
        )
    }

    searchByName = async (search) => {
        const config = getAuthHeaderToken();
        let data = { name: search };
        return await axios.post(endpoints.packages.url + '/search-name', data, config).then(
            res => {
                return res.data
            }
        )
    }

    delete = async (id) => {
        const config = getAuthHeaderToken();
        return await axios.delete(endpoints.packages.url + "/" + id, config).then(
            res => res.data
        );

    };

}


export default new PackagesHttpService()