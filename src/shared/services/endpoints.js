const baseUrl = 'https://us-central1-xvba-691e3.cloudfunctions.net';
const apiVersion = '/api/v1/';
const url = baseUrl + apiVersion;
/**
 * Global Api Endpoints Manager
 */
export const packages = {
    get: url + 'packages'
}