import React from 'react';
import _ from 'lodash';


import PackagesHttpService from "../../services/packagesHttp.service";

const debounce = _.debounce((callback) => {
    console.log('Time wait')
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
            if (checkedName) {
                errors = { ...nameErrors, ...validDescription };
            } else {
                errors = { ...nameErrors, ...validDescription, valid_name: "Package Name Already in use" };
            }
            callback(errors)
        })
    }
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
    }


    return error
}


const validatePackageDescription = (values) => {

    let error = {}
    if (!values.description) {
        error.description = "Required"
    } else if (values.description.length < 15) {
        error.description = "Mini length is 15 characters"
    }


    return error
}



const handleCheckValidName = async (val) => {
    console.log(val)
    if (val !== "" && val.length >= 3) {
        return await PackagesHttpService.searchByName(val).then(
            res => res.data.length > 0 ? false : true
        )
    }
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