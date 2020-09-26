import React from 'react';
import styles from './Info.module.css'

export const InfoPage = () => {
    return (
        <div className={styles['Container']}>
            <div className={styles['Discovery']}>
                <div>Speed up your development with XVBA</div>
                <div></div>
            </div>
            <div className={styles['Content-Grid']}>
                <div>

                    <div className={styles['Text-Content']}>
                        <h4 className={styles['Text-Content-Title']}>WRITE EXCEL VBA IN VSCODE WITH AUTO-COMPLETE AND SNIPPETS</h4>
                        Now you can use your Vscode for create/edit VBA from Excel with XVBA extension and
                        create/share your code in packages with XVBA-CLI
                    </div>
                </div>
                <div className={styles['Image-Container']}>
                    <img alt="" src="./images/xvba/autocomplete.gif"></img>
                </div>
            </div>
            <div className={styles['Discovery']}>
                <div>Speed up your development with XVBA</div>
                <div></div>
            </div>
            <div className={styles['Content-Grid']}>

                <div className={styles['Image-Container']}>
                    <img alt="" src="./images/xvba/autocomplete.gif"></img>
                </div>
                <div className={styles['Text-Content']}>
                    <h4 className={styles['Text-Content-Title']}>AUTO-COMPLETE & SNIPPETS</h4>
                        Now you can use your Vscode for create/edit VBA from Excel with XVBA extension and
                        create/share your code in packages with XVBA-CLI
                    </div>

            </div>
            <div className={styles['Discovery']}>
                <div>Speed up your development with XVBA</div>
                <div></div>
            </div>
            <div className={styles['Content-Grid']}>
                <div>
                    <div className={styles['Text-Content']}>
                        <h4 className={styles['Text-Content-Title']}>CREATE AND SHARE VBA PACKAGES WITH XVBA-CLI</h4>
                        Now you can use your Vscode for create/edit VBA from Excel with XVBA extension and
                        create/share your code in packages with XVBA-CLI
                    </div>
                </div>
                <div>
                    Image
               </div>
            </div>
            <div className={styles['Discovery']}>
                <div>Speed up your development with XVBA</div>
                <div></div>
            </div>
            <div className={styles['Content-Grid']}>
                <div>
                    <div>image</div>
                </div>
                <div className={styles['Text-Content']}>
                    <h4 className={styles['Text-Content-Title']}>SPEED WITH AUTO-COMPLETE & SNIPPETS</h4>
                        Now you can use your Vscode for create/edit VBA from Excel with XVBA extension and
                        create/share your code in packages with XVBA-CLI
                    </div>
            </div>

        </div>
    )
}

