import React from "react";
import styles from './User-List-Packages.module.css'

export const UserListPackagesComp = () => {


    return (
        <div className={styles['Container']}>
           <div className={styles['Header']}>
               <div>Item</div>
               <div>Name</div>
               <div>Version</div>
               <div>Stars</div>
               <div>Dow</div>
               <div>Options</div>
           </div>
        </div>
    )
}