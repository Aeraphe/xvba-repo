import React from 'react';
import _ from 'lodash';
import PackagesHttpService from "../../services/packagesHttp.service";



const debounce = _.debounce((callback) => {
    callback();
}, 700)

export const validateUploadPackages = {

    required: () => {
        return {
            name: "Required",
            description: 'Required',
            valid_name: 'Required'
        }
    },

    checkData: async (values, callback) => {
        let errors;
        debounce(async () => {
            const nameErrors = validatePackageName(values);
            const validDescription = validatePackageDescription(values);
            const checkedName = await handleCheckValidName(values.name);
           const validFileType = validateFileExtension(values)
            if (checkedName) {
                errors = { ...nameErrors, ...validDescription,...validFileType };
            } else {
                errors = { ...nameErrors, ...validDescription, valid_name: "Package Name Already in use",...validFileType };
            }
            callback(errors)
        })
    }
}


const validateFileExtension = (values) => {
    const extension = getFileExtension(values.file)
    let error = {}
    if (!values.file) {
        error.file = "Required"
    }else if ('xvba' !== extension) {
        error.file = "File not allowed"
    }
    console.log(error);
    return error
}

function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}


/**
 * Validate Package name 
 * @param {{name:string}} values 
 */
const validatePackageName = (values) => {
    let regexEspecialChar = new RegExp(/[!#$%^&*(),.?":{}|<>]/g);
    let error = {}
    if (!values.name) {
        error.name = "Required"
    } else if (values.name.length < 3) {
        error.name = "Mini length is 3 characters"
    } else if (regexEspecialChar.test(values.name)) {
        error.name = "Especial Characters a Denied !#$%^&*(),.?:{}"
    } else if (hasWhiteSpace(values.name)) {
        error.name = "Package name can't have withe space"
    }


    return error
}

function hasWhiteSpace(s) {
    return /\s/g.test(s);
}

const validatePackageDescription = (values) => {

    let error = {}
    if (!values.description) {
        error.description = "Required"
    } else if (values.description.length < 10) {
        error.description = "Mini length is 10 characters"
    }


    return error
}


let lastSearchText;
let lastSearchResult;

/**
 * 
 * @param {string} val 
 */
const handleCheckValidName = async (val) => {
    //Check if search text change
    if (lastSearchText !== val) {
        if (val !== "" && val.length >= 3) {
            lastSearchText = val;
            return await PackagesHttpService.searchByName(val).then(
                res => {
                    lastSearchResult = res.data.length > 0 ? false : true
                    return lastSearchResult
                }

            )
        }
    }
    return lastSearchResult;

}



export const validPackageNameAlert = (errors) => {

    if (errors.name) {
        return <span style={{ fontSize: '11px', color: 'red' }}>{errors.name}</span>
    } else if (errors.valid_name) {
        return <span style={{ fontSize: '11px', color: 'red' }}>{errors.valid_name}</span>
    }
    return <span style={{ fontSize: '13px', color: 'green' }}>Valid</span>;
}


export const validPackageDescriptionAlert = (errors) => {
    if (errors.description) {
        return errors.description && <span style={{ fontSize: '11px', color: 'red' }}>{errors.description}</span>
    }
    return <span style={{ fontSize: '13px', color: 'green' }}>Valid</span>;
}