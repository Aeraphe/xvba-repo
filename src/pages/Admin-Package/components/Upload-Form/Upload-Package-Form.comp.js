import React from 'react';
import styles from "./Upload-Package-Form.module.css";
export const UploadPackageForm = () => {

    return (
        <div>
            <form className={styles['Upload-Package-Form']}>
                <div className={styles['Upload-Package-Form-Container']}>
                    <label htmlFor="package_name"> Package name: </label>
                    <input id="package_name" type="text" placeholder="Package Name"></input>
                    <p><input type="file" ></input></p>
                    <button className={styles['Form-Btn']} type="submit">Upload</button>
                </div>

            </form>
        </div>
    )

}
