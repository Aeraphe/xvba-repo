import React from 'react';

export const useFormValidation = (initialState, validate) => {
    const [values, setValue] = React.useState(initialState);
    const [errors, setErrors] = React.useState(validate.required);


    const handleChange = (event) => {
        handleSetData(event);
        handleValidateData(event);
    }

    const handleSetData = (data) => {
        setValue({ ...values, [data.name]: data.value })
    }

    const handleValidateData = (data) => {
        validate.checkData(
            {
                ...values,
                [data.name]: data.value
            }, (errors) => {
                setErrors(errors);
            });
    }

    const isSubmitting = () => {
        const noErrors = Object.keys(errors).length === 0;
        if (noErrors) {
            return false
        } else {
            return true
        }
    }

    /**
     * Clear all fields
     */
    const clearFields = () => {
        setValue(initialState)
        setErrors(validate.required)
    }

    return { handleChange, values, errors, isSubmitting, clearFields }
}