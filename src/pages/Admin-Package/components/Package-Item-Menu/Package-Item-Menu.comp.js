import React, { useState } from "react";
import styles from './Package-Item-Menu.module.css'
import { Alert } from '../../../../shared/components/Alert/Alert.shared';
import { useDispatch } from "react-redux";
import { deleteUserPackage ,fetchPackagesByUserId } from "../../../../shared/reducers/user-packages.slice";


export const PackageItemMenuComp = ({ children, id }) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')
    const [alertTitle, setAlertTitle] = useState('')
    const [showAlert, setToggle] = useState(false)

    const handleClick = () => {
        setShow(!show)

    }

    const handleAlert = (action) => {
        switch (action) {
            case 'delete':
                console.log('sss')
                setAlertTitle('Do you rely want to delete the package?')

                setToggle(!showAlert)
                break;
            default:
                setAlertMsg('')
                setToggle(false)
                break;
        }
    }

    const handleAccept = async () => {
        await dispatch(deleteUserPackage(id))
        await dispatch(fetchPackagesByUserId())
        setToggle(false);
    }

    return (
        <>
            <div style={{ border: '0px' }} className={styles['Container']}>
                <div style={{ border: '0px' }} className={styles['List-Item']}>
                    {children} <span onClick={() => handleClick()} className={styles['Btn-Show']}>::</span>
                </div>

                <div onMouseLeave={() => setShow(false)} style={{ display: show ? 'block' : 'none' }} className={styles['Menu']}>
                    <ul>
                        <li >
                            Update
                    </li>
                        <li onClick={() => handleAlert('delete')}>
                            Delete
                    </li>
                    </ul>
                </div>

            </div>
            <Alert show={showAlert} onToggle={() => setToggle(!showAlert)} onAccept={() => handleAccept()} message={alertMsg} title={alertTitle} ></Alert>
        </>
    )


}