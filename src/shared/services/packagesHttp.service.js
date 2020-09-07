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

    add = async (data) => {
        return await axios.post(endpoints.packages.url, data, config).then(
            res => {
                return res.data
            }
        )
    }
}


export default new PackagesHttpService()