import React from 'react';
import styles from './Xvba-Cli-Page.module.css'
import marked from 'marked';
import DOMPurify from 'dompurify';

import { readme } from './xvba-cli-readme';

export const XvbaCliPage = () => {

    const readmeExtension = { __html: DOMPurify.sanitize(marked(readme())) }
    return (
        <>
            <div className={styles['Container']}>
                <div className={styles['Container-Grid']}>
                    <div className={styles['Menu-Container']}>
                        <div className={styles['Menu-Title']}>Menu</div>
                        <div className={styles['Menu']}>
                            <ul>
                                <li className={styles['Menu-Btn']}><span>: :</span> About Xvba-Cli</li>                               
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