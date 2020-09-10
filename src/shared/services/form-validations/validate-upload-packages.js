import { from, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';


import PackagesHttpService from "../../services/packagesHttp.service";

export const validateUploadPackages = async (values, callback) => {

    const nameErrors = validatePackageName(values);
    const validDescription = validatePackageDescription(values);
    const obs$ = checkNameDebounce(values.name);
    callback({ ...nameErrors, ...validDescription })
    if (obs$) {
        obs$.subscribe(checkedName => {
            if (checkedName) {
                callback({ ...nameErrors })
            } else {
                callback({ ...nameErrors, valid_name: "Package Name Already in use" })
            }

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


let lastSearch = null;

const checkNameDebounce = (val) => {



    if (lastSearch !== val && val !== "" && val.length >= 3) {
        lastSearch = val;
        let observer = from(PackagesHttpService.searchByName(val).then(
            res => {

                return res.data.length > 0 ? false : true;
            }
        ))
        return observer.pipe(debounce(() => interval(1000)));

    }

}

