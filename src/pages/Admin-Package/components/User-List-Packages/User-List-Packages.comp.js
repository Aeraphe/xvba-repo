import React, { useEffect, useState } from "react";
import styles from './User-List-Packages.module.css'
import { PackageItemMenuComp } from "../Package-Item-Menu/Package-Item-Menu.comp";
import PackagesHttpService from "../../../../shared/services/packagesHttp.service";

export const UserListPackagesComp = () => {
    const [packages, setPackages] = useState();

    useEffect(() => {
        (async () => {
            let data = await handleGetUserPackages();
            setPackages(data)

        })()

    }, [])


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
                {packages}
            </div>
        </div>

    )
}

const handleGetUserPackages = async () => {
    const { data } = await PackagesHttpService.getUserAuthPackages();

    let components = [];
    if (data) {
        data.forEach((element, index) => {
            components.push(<PackageListItem data={element} item={index+1} key={index}></PackageListItem>)
        });
    }
    return components;
}

const PackageListItem = (props) => {
    const { name,rating,version,downloads } = props.data
    return (
        
        
        <div   className={styles['Body-Container']}>
            <div className={styles['Body-Item']}>
                <div>{props.item}</div>
                <div><PackageItemMenuComp >{name}</PackageItemMenuComp></div>
                <div>{version}</div>
                <div>{rating}</div>
                <div>{downloads}</div>
                <div>Options</div>
            </div>
        </div>
    )
}