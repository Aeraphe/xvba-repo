import React, { useState } from 'react';
import styles from "./Upload-Package-Form.module.css";
import PackagesHttpService from "../../../../shared/services/packagesHttp.service";
import _ from 'lodash';
let lastSearch = null;
export const UploadPackageForm = () => {

    const [search, setSearch] = useState('');
    const [isValid, setValidName] = useState('')
    const checkNameDebounce =
        _.debounce(async (val) => {
            if (lastSearch !== val && val !== "") {
                setSearch(val)
                lastSearch = val;
                const isValidName = await handleSearchNameExists(val);
                console.log(isValidName)
                if (isValidName) {
                    setValidName(<span style={{color:'blue', fontWeight:'500',fontSize:'13px'}}>Valid</span>);
                } else {
                    setValidName(<span style={{color:'red', fontWeight:'500',fontSize:'13px'}}>Name already in use</span>);
                }

            }

        }, 2500);



    const handleOnChangeInputPackageName = (e) => {
        checkNameDebounce(e.target.value)
    }
    return (

        <div>
            <form className={styles['Upload-Package-Form']}>
                <div className={styles['Upload-Package-Form-Container']}>
                    <label htmlFor="package_name"> Package name: {isValid}</label>
                    <input onChange={e => handleOnChangeInputPackageName(e)} className={styles['Package-Name-Input']} id="package_name" type="text" placeholder="Package Name"></input>
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


const handleSearchNameExists = async (name) => {

    const existName = await PackagesHttpService.searchByName(name).then(
        res => {
            if (res.data.length > 0) {
                return false;
            } else {
                return true;
            }

        }
    )
    return existName;
}
