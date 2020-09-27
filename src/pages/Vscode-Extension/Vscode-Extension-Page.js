import React, { useEffect } from 'react';
import styles from './Vscode-Extension-Page.module.css'
import marked from 'marked';
import DOMPurify from 'dompurify';
import ReactGA from 'react-ga';

import { readme } from './extension-readme';

export const VscodeExtensionPage = () => {
    useEffect(() => {
        ReactGA.event({
            category: 'Extension',
            action: 'Access Extension Page'
        });
    })
    const readmeExtension = { __html: DOMPurify.sanitize(marked(readme())) }
    return (
        <>
            <div className={styles['Container']}>
                <div className={styles['Container-Grid']}>
                    <div className={styles['Menu-Container']}>
                        <div className={styles['Menu-Title']}>Menu</div>
                        <div className={styles['Menu']}>
                            <ul>
                                <li className={styles['Menu-Btn']}><span>: :</span> About Xvba Extension</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles['Readme-Container']}>
                        <div className={styles['Readme']} dangerouslySetInnerHTML={readmeExtension} ></div>
                    </div>

                </div>

            </div>
        </>
    )
}