import React, { useEffect } from 'react';


export const useFormValidation = (initialState, validate) => {
    const [values, setValue] = React.useState(initialState);
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setSubmitting] = React.useState(false);

    React.useEffect(() => {
        if (isSubmitting) {

            const noErrors = Object.keys(errors).length === 0;

            if (noErrors) {
                setSubmitting(false);
            } else {
                setSubmitting(true);
            }
        }

    }, [errors, isSubmitting])

    const handleChange = (event) => {
        setValue(
            {
                ...values,
                [event.name]: event.value
            }
        )
    }

    useEffect(() => {
        validate(values, (errors) => {
            setErrors(errors);
        });
    }, [validate, values])

    const handleBlur = () => {
        validate(values, (errors) => {
            setErrors(errors);
        });

    }
    const handleSubmit = (event) => {
        event.preventDefault();

        const noErrors = Object.keys(errors).length === 0;
        if (noErrors) {
            setSubmitting(!isSubmitting);
        } else {
            setSubmitting(!isSubmitting);
        }


    }

    return { handleChange, values, handleSubmit, handleBlur, errors, isSubmitting }
}