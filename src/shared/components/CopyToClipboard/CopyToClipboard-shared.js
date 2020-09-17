import React, { useState, useEffect } from 'react';
import styles from './CopyToClipboard.module.css';


export const CopyToClipboard = (props) => {

    const [clipboardText, setClipboardText] = useState('npx xvba install ')

    const handleCopy = (input) => {
        let copyText = document.querySelector("#" + input);
        copyText.select();
        document.execCommand("copy");
        setClipboardText('copied')
        setTimeout(() => {
            setClipboardText('npx xvba install ' + props.package)
        }, 700)
    };
    useEffect(() => {
        setClipboardText('npx xvba install ' + props.package)
    }, [props.package])

    return (
        <input className={styles['Input-Clipboard']} id={props.package} onClick={(e) => handleCopy(props.package)} readOnly type="text" value={clipboardText} />
    )
}