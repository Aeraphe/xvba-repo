const baseUrl = 'http://localhost:5001/xvba-691e3/us-central1';
//const baseUrl = 'https://us-central1-xvba-691e3.cloudfunctions.net';
const apiVersion = '/api/v1/';
const url = baseUrl + apiVersion;
/**
 * Global Api Endpoints Manager
 */
export const packages = {
    url: url + 'packages',
    user_auth_packages: url + 'packages/user-auth'
}

export const users = {
    url: url + 'users'
}

