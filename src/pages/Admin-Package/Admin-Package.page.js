import React from 'react';
import { UploadPackageForm } from "./components/Upload-Form/Upload-Package-Form.comp";
import styles from "./Admin-Package-Page.module.css";
import { Modal } from "../../shared/components/index";
import { UserMenuComp } from './components/User-Menu/User-Menu';
import { UserListPackagesComp } from './components/User-List-Packages/User-List-Packages.comp';


export const AdminPackagePage = () => {

    return (
        <div className={styles['Upload-Package']}>

            <div className={styles['User-Menu']}>
                <UserMenuComp></UserMenuComp>
            </div>
            <div className={styles['User-Content']}>
                <UserListPackagesComp></UserListPackagesComp>
            </div>

            <Modal height="210px">
                <UploadPackageForm></UploadPackageForm>
            </Modal>
        </div>
    )
}



