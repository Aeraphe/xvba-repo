import React from 'react';
import styles from "./Upload-Package-Form.module.css";
export const UploadPackageForm = () => {

    return (
        <form className={styles['Uplaod-Package-Form']}>
            <div className={styles['Uplaod-Package-Form-Container']}>
                <label for="package_name"> Package name: </label>
                 <input id="package_name" type="text" placeholder="Package Name"></input>
               
                <p>
                    <input type="file" ></input>
                </p>

                <button className={styles['Form-Btn']} type="submit">Upload</button>
            </div>

        </form>)

}
