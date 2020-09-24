//const baseUrl = 'http://localhost:5001/xvba-repository/us-central1';
const baseUrl = 'https://us-central1-xvba-repository.cloudfunctions.net';
const apiVersion = '/api/v1/';
const url = baseUrl + apiVersion;
/**
 * Global Api Endpoints Manager
 */
export const packages = {
    url: url + 'packages',
    user_auth_packages: url + 'packages/user-auth',
    file_readme: url + 'packages/readme',
    update:url + 'packages/update/'
}

export const users = {
    url: url + 'users'
}

