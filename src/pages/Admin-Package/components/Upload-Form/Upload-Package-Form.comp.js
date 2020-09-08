import React from 'react';
import styles from "./Upload-Package-Form.module.css";
export const UploadPackageForm = () => {

    return (
     
        <div>
            <form className={styles['Upload-Package-Form']}>
                <div className={styles['Upload-Package-Form-Container']}>
                    <label htmlFor="package_name"> Package name: </label>
                    <input className={styles['Package-Name-Input']} id="package_name" type="text" placeholder="Package Name"></input>
                    <label htmlFor="description"> Description: </label>
                    <textarea id="description" className={styles['Description']} cols={1} rows={3}></textarea>
                    <label htmlFor="file"> Choose a file: </label>
                    <p><input id="file" type="file" ></input></p>
                    <hr></hr>
                    <div className={styles['Btn-Container']}>
                    <button className={styles['Form-Btn']} type="submit">Upload</button>
                    </div>
                   
                </div>

            </form>
        </div>
    )

}
