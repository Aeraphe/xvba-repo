import axios from 'axios';
import * as endpoints from './endpoints';



class PackagesHttpService {
    get = async () => {
        let token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        return await axios.get(endpoints.packages.url, config);
    }
}


export default new PackagesHttpService()