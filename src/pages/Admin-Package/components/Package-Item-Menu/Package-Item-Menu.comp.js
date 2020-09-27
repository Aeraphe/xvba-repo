import React, { useState } from "react";
import styles from './Package-Item-Menu.module.css'
import { Alert } from '../../../../shared/components/Alert/Alert.shared';
import { useDispatch, useSelector } from "react-redux";
import { deleteUserPackage, fetchPackagesByUserId } from "../../../../shared/reducers/user-packages.slice";
import PackageHttpServices from "../../../../shared/services/packagesHttp.service";
import { LoadingSharedComp } from '../../../../shared/components/Loading/loading';

let fileSelected = undefined;
let alertTitle = ""
let alertMsg = ""

export const PackageItemMenuComp = ({ children, id }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    const [showAlert, setToggle] = useState(false)
    const [showUpdatePackage, setShowUpdatePackage] = useState(false);
    const [showLoading, setShowLoading] = useState(false)
    const selectedPackageName = useSelector(state => state.user_packages.packageSelectedName)


    const handleClick = () => {
        setShow(!show)
    }

    const handleAlert = (action) => {
        switch (action) {
            case 'delete':
                console.log('sss')
                alertTitle = 'Do you rely want to delete the package?'
                setToggle(!showAlert)
                break;
            default:
                alertMsg = ""
                setToggle(false)
                break;
        }
    }

    const handleAccept = async () => {
        setShowLoading(true)
        await dispatch(deleteUserPackage(id))
        await dispatch(fetchPackagesByUserId())
        setShowLoading(false)
        setToggle(false);
    }

    const handlerShowModal = () => {
        
        setShowUpdatePackage(!showUpdatePackage);
    }

    const handlerUpdatePackage = async () => {
        setShowLoading(true)
        let postData = new FormData();
        postData.append('package', fileSelected)
        const params = { name: selectedPackageName, id: id }
        postData.append('data', JSON.stringify(params))
        await PackageHttpServices.uploadPackageFileUpdate(postData)
        setShowLoading(false);
        setShowUpdatePackage(!showUpdatePackage);
    }



    return (
        <>
            <div style={{ border: '0px' }} className={styles['Container']}>
                <div style={{ border: '0px' }} className={styles['List-Item']}>
                    {children} <span onClick={() => handleClick()} className={styles['Btn-Show']}>::</span>
                </div>

                <div onMouseLeave={() => setShow(false)} style={{ display: show ? 'block' : 'none' }} className={styles['Menu']}>
                    <ul>
                        <li onClick={() => handlerShowModal()} >
                            Update
                    </li>
                        <li onClick={() => handleAlert('delete')}>
                            Delete
                    </li>
                    </ul>
                </div>

            </div>
            <Alert show={showAlert} onToggle={() => setToggle(!showAlert)} onAccept={() => handleAccept()} message={alertMsg} title={alertTitle} >
                <div style={{ visibility: showLoading ? 'visible' : 'hidden' }} className={styles['Loading']}>
                    <LoadingSharedComp />
                </div>
            </Alert>
            <Alert
                show={showUpdatePackage}
                onToggle={() => handlerShowModal(!showUpdatePackage)}
                onAccept={() => handlerUpdatePackage()}
                message={''}
                title={`Do you want to update the package ${selectedPackageName} ?`} >
                <div>
                    <form>
                        <input onChange={e => fileSelected = e.target.files[0]} type="file"></input>
                    </form>
                    <div style={{ visibility: showLoading ? 'visible' : 'hidden' }} className={styles['Loading']}>
                        <LoadingSharedComp />
                    </div>
                </div>
            </Alert>


        </>
    )


}