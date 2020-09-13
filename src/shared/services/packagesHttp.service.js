import axios from 'axios';
import * as endpoints from './endpoints';

let token = localStorage.getItem('token');
const config = {
    headers: {
        Authorization: 'Bearer ' + token
    }
}

class PackagesHttpService {

    get = async () => {
        return await axios.get(endpoints.packages.url, config).then(
            res => res.data
        );

    };

    getUserAuthPackages = async () => {
        return await axios.get(endpoints.packages.user_auth_packages, config).then(
            res => res.data
        );
    }

    uploadNewPackage = async (data) => {
        let uploadConf = {

            headers: {
                ...config.headers,
                'Content-Type': `multipart/form-data;boundary=${data._boundary}`,
                'Access-Control-Allow-Origin': '*',

            }
        }


        return await axios.post(endpoints.packages.url, data, uploadConf).then(
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
        let data = { name: search }
        return await axios.post(endpoints.packages.url + '/fuse-search', data, config).then(
            res => {
                return res.data
            }
        )
    }

    searchByName = async (search) => {
        let data = { name: search };
        return await axios.post(endpoints.packages.url + '/search-name', data, config).then(
            res => {
                return res.data
            }
        )
    }

    delete = async (id) => {
        return await axios.delete(endpoints.packages.url + "/" + id, config).then(
            res => res.data
        );

    };

}


export default new PackagesHttpService()