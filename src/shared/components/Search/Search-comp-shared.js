import React from 'react'
import styles from "./Search-comp-shared.module.css";




export const SearchShareComp = ()=>{
return(
    <div className={styles['Container']}>
        <div className={styles['Form-Container']}>
            <form>
               <div  className={styles['Form-Group']}>
               <input  className={styles['Search-Input']}  placeholder="Search Package..." id="search" type="text"/>
                <button className={styles['Search-Btn']}>Search</button>
               </div>
               
            </form>
        </div>
    </div>
)
}