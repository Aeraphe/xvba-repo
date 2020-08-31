import React from 'react';
import { XvbaLogoSharedComp } from '../../shared/components/Xvba-Logo.shared.component'
import { UploadPackageForm } from "./components/Upload-Package-Form.comp";
import styles from "./Upload-Package.module.css";

export const UploadPackagePage = () => {

    return (
        <div className={styles['Upload-Package']}>
            <div>
                <XvbaLogoSharedComp size="5rem">
                    <p><b>Publish new package</b></p>
                </XvbaLogoSharedComp>
                <UploadPackageForm></UploadPackageForm>
            </div>

        </div>
    )
}



