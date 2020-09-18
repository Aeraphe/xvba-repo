import React, { useState } from 'react';
import styles from "./Upload-Package-Form.module.css";
import { useFormValidation } from '../../../../shared/services/custom-hooks/useForm';
import { validateUploadPackages, validPackageDescriptionAlert, validPackageNameAlert,validFileTypeAlert } from '../../../../shared/services/form-validations/validate-upload-packages'
import PackagesHttpService from "../../../../shared/services/packagesHttp.service";
import { fetchPackagesByUserId } from "../../../../shared/reducers/user-packages.slice";
import { useDispatch } from "react-redux";
export const UploadPackageForm = ({ toggleModal }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState();

    const INITIAL_VALUES = {
        name: "",
        description: '',
        file: ''

    }
    const {
        handleChange,
        values,
        isSubmitting,
        clearFields,
        errors } = useFormValidation(INITIAL_VALUES, validateUploadPackages)

    const validAlerts = {
        name: validPackageNameAlert(errors),
        description: validPackageDescriptionAlert(errors),
        file: validFileTypeAlert(errors),
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let postData = new FormData();
            postData.append('package', formData)
            postData.append('data', JSON.stringify(values))
            await PackagesHttpService.uploadNewPackage(postData);
            clearFields();
            toggleModal();
            dispatch(fetchPackagesByUserId())
        } catch (error) {

        }


    }

    const handleInputFileChange = (e) => {


        handleChange({ name:'file',value: e.target.files[0].name })
        setFormData(e.target.files[0]);

    }
    return (

        <div>
            <form onSubmit={handleSubmit} className={styles['Upload-Package-Form']}>
                <div className={styles['Upload-Package-Form-Container']}>
                    <label htmlFor="package_name"> Package name: {validAlerts.name} </label>
                    <input
                        value={values.name}
                        name="name"
                        minLength={3}
                        onChange={e => handleChange(e.target)}
                        className={styles['Package-Name-Input']}
                        id="package_name"
                        type="text"
                        placeholder="Package Name" />

                    <label htmlFor="description"> Description: {validAlerts.description}</label>
                    <textarea
                        value={values.description}
                        name="description"
                        onChange={e => handleChange(e.target)}
                        id="description"
                        className={styles['Description']}
                        cols={1} rows={3}
                    ></textarea>
                    <label htmlFor="file"> Choose a file:  {validAlerts.file}</label>
                    <p><input onChange={e => handleInputFileChange(e)} id="file" type="file" /></p>
                    <hr></hr>
                    <div className={styles['Btn-Container']}>
                        <button disabled={isSubmitting()} className={styles['Form-Btn']} type="submit">Upload</button>
                    </div>

                </div>

            </form>
        </div>
    )

}
