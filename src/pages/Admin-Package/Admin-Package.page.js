import React, { useEffect, useState } from 'react';
import { UploadPackageForm } from "./components/Upload-Form/Upload-Package-Form.comp";
import styles from "./Admin-Package-Page.module.css";
import { Modal } from "../../shared/components/index";
import { UserMenuComp } from './components/User-Menu/User-Menu';
import { UserListPackagesComp } from './components/User-List-Packages/User-List-Packages.comp';
import ReactGA from 'react-ga';

export const AdminPackagePage = () => {

    useEffect(()=>{
        ReactGA.event({
            category: 'Admin',
            action: 'Access an Admin Account'
          });
    })
    const [uploadPackageModalShow, setUploadPackageModalShow] = useState(false);
    let handleShowPackageModal = () => {
        setUploadPackageModalShow(!uploadPackageModalShow)
    }

    return (
        <div className={styles['Upload-Package']}>

            <div className={styles['User-Menu']}>
                <UserMenuComp showModalPackageUpload={() => handleShowPackageModal}></UserMenuComp>
            </div>
            <div className={styles['User-Content']}>
                <UserListPackagesComp></UserListPackagesComp>
            </div>

            <Modal height="210px" show={uploadPackageModalShow} showModal={() => handleShowPackageModal}>
                <UploadPackageForm toggleModal={handleShowPackageModal} ></UploadPackageForm>
            </Modal>
        </div>
    )
}



