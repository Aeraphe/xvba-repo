import React from 'react';
import styles from "./Upload-Package-Form.module.css";
import { debounce } from 'lodash';


import { useFormValidation } from '../../../../shared/services/custom-hooks/useForm';
import { validateUploadPackages } from '../../../../shared/services/form-validations/validate-upload-packages'



export const UploadPackageForm = () => {


    const INITIAL_VALUES = {
        name: "",
        description: ''
    }
    const {
        handleChange,
        values,
        handleSubmit,
        handleBlur,
        errors,
        isSubmitting } = useFormValidation(INITIAL_VALUES, validateUploadPackages)


    const handleInputThrottled = debounce((e) => handleChange(e), 700)


    const validAlerts = {
        name: validPackageName(errors),
        description: validPackageDescription(errors)
    }


    return (

        <div>
            <form onSubmit={handleSubmit} className={styles['Upload-Package-Form']}>
                <div className={styles['Upload-Package-Form-Container']}>
                    <label htmlFor="package_name"> Package name: {validAlerts.name} </label>
                    <input

                        name="name"
                        minLength={3}
                        onChange={e => handleInputThrottled(e.target)}
                        onBlur={handleBlur}
                        className={styles['Package-Name-Input']}
                        id="package_name"
                        type="text"
                        placeholder="Package Name" />


                    <label htmlFor="description"> Description: {validAlerts.description}</label>
                    <textarea
                        value={values.description}
                        name="description"
                        onChange={e => handleChange(e.target)}
                        onBlur={handleBlur}
                        id="description"
                        className={styles['Description']}
                        cols={1} rows={3}
                    ></textarea>
                    <label htmlFor="file"> Choose a file: </label>
                    <p><input id="file" type="file" ></input></p>
                    <hr></hr>
                    <div className={styles['Btn-Container']}>
                        <button disabled={isSubmitting} className={styles['Form-Btn']} type="submit">Upload</button>
                    </div>

                </div>

            </form>
        </div>
    )

}


const validPackageName = (errors) => {

    if (errors.name) {
        return <span style={{ fontSize: '11px', color: 'red' }}>{errors.name}</span>
    } else if (errors.valid_name) {
        return <span style={{ fontSize: '11px', color: 'red' }}>{errors.valid_name}</span>
    }
    return <span style={{ fontSize: '13px', color: 'green' }}>Valid</span>;
}


const validPackageDescription = (errors) => {

    if (errors.description) {
        return errors.description && <span style={{ fontSize: '11px', color: 'red' }}>{errors.description}</span>
    } 
    return <span style={{ fontSize: '13px', color: 'green' }}>Valid</span>;
}