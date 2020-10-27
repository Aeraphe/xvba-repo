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
        const response = await axios.get(endpoints.packages.url, config);
        return response.data;

    };


    getPackageReadme = async (packageName) => {

        const response = await axios.get(endpoints.packages.file_readme + "/" + packageName);
        return response.data;

    };

    getUserAuthPackages = async () => {
        const config = getAuthHeaderToken();
        const response = await axios.get(endpoints.packages.user_auth_packages, config);
        return response.data;
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

        const response = await axios.post(endpoints.packages.url, data, uploadConf);
        return response.data;
    }


    uploadPackageFileUpdate = async (data) => {
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
     
        const response = await axios.put(endpoints.packages.update, data, uploadConf);
        return response.data;
    }
    /**
     * Search for packages by name
     * 
     * @param {string} search 
     */
    fuseSearch = async (search) => {
        const config = getAuthHeaderToken();
        let data = { name: search }
        const response = await axios.post(endpoints.packages.url + '/fuse-search', data, config)
        return response.data;
    }

    searchByName = async (search) => {
        const config = getAuthHeaderToken();
        let data = { name: search };
        const response = await axios.post(endpoints.packages.url + '/search-name', data, config);
        return response.data;
    }

    delete = async (id) => {
        const config = getAuthHeaderToken();
        const response =  await axios.delete(endpoints.packages.url + "/" + id, config);
        return response.data;

    };

}


export default new PackagesHttpService()