import React from 'react';
import styles from './Info.module.css'
import { Link } from 'react-router-dom';

export const InfoPage = () => {
    return (
        <div className={styles['Container']}>
            <div className={styles['Discovery']}>
                <div>Speed up your VBA development with Xvba Tools</div>
                <div></div>
            </div>
            <div className={styles['Content-Grid']}>
                <div>

                    <div className={styles['Text-Content']}>
                        <h4 className={styles['Text-Content-Title']}>
                            WRITE EXCEL VBA IN VSCODE
                        </h4>
                        <ul>
                            <li>Now you can use your Vscode for create/edit VBA codes with <b>*namespace</b> for sub-folders </li>
                            <li>With <b>Live Serve</b> all your changes automatic loads on Excel</li>
                            <li>With XVBA and <b>Git</b> you can track your code changes and VBA projects can be done with <b>Teams</b></li>
                        </ul>
                    </div>
                </div>
                <div className={styles['Text-Content']}>
                    <h4 className={styles['Text-Content-Title']}>USE AUTO-COMPLETE & SNIPPETS</h4>
                    <ul>
                        <li>Xvba came with <b>Language Serve</b> that make its possible to use code <b>auto-completion</b>.</li>
                        <li>Other feature implemented for speed up your code development is <b>Snippets</b>.</li>
                    </ul>
                </div>
                <div>
                    <div className={styles['Text-Content']}>
                        <h4 className={styles['Text-Content-Title']}>CREATE AND SHARE VBA PACKAGES</h4>
                        <ul>
                            <li>For the first time we can create, install and share VBA code as Packages.</li>
                            <li>For that, we create a nodejs app <b>xvba-cli</b> and a repository.</li>
                        </ul>
                        <div className={styles['Footer-Text']}><Link to="/xvba-extension">See full documentation for all features...</Link> </div>

                    </div>
                </div>
            </div>

            <div className={styles["Image-Container"]}>
                <div className={styles['Image-Content']}>
                    <img alt="" src="./images/xvba/autocomplete.gif"></img>
                </div>

            </div>

        </div>
    )
}

