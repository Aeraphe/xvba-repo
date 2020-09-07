import React from "react";
import styles from './User-List-Packages.module.css'
import { PackageItemMenuComp } from "../Package-Item-Menu/Package-Item-Menu.comp";

export const UserListPackagesComp = () => {


    return (
        <div>
            <p className={styles['Title']}>:: User Packages</p>
            <div className={styles['Container']}>
                <div className={styles['Header']}>
                    <div>Item</div>
                    <div>Name</div>
                    <div>Version</div>
                    <div>Stars</div>
                    <div>Installs</div>
                    <div>Options</div>
                </div>

            </div>

            <div>
                <PackageListItem></PackageListItem>
                <PackageListItem></PackageListItem>
            </div>
        </div>

    )
}

const PackageListItem = () => {
    return (
        <div className={styles['Body-Container']}>


            <div className={styles['Body-Item']}>
                <div>Item</div>
                <div><PackageItemMenuComp>Name</PackageItemMenuComp></div>
                <div>Version</div>
                <div>Rating</div>
                <div>Installs</div>
                <div>Options</div>
            </div>
        </div>
    )
}