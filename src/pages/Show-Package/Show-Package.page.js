import React, { useEffect, useState } from 'react';
import styles from './Show-Package.module.css'
import { SearchShareComp } from "../../shared/components/Search/Search-comp-shared";
import marked from 'marked';
import DOMPurify from 'dompurify';
import { CopyToClipboard } from "../../shared/components/CopyToClipboard/CopyToClipboard-shared";
import PackageHttpService from '../../shared/services/packagesHttp.service';


export const ShowPackagePage = (props) => {

    console.log(props);
    const [readme, setReadme] = useState({ __html: "<p>Loading...</p>" });
    useEffect(() => {
        (async () => {
            const data = await PackageHttpService.getPackageReadme(props.match.params.package);
            setReadme({ __html: DOMPurify.sanitize(marked(data)) })
        })()
    }, [props.match.params.package])
    return (

        <div className={styles['Container']}>
            <div className={styles['Search']}>
                <SearchShareComp></SearchShareComp>
            </div>
            <div className={styles['Content']}>
                <div className={styles['Content-Grid']}>
                    <div className={styles['Package-Title-Bar']}>
                        <div className={styles['Package-Title']}>Gauss-Curve</div>
                        <div className={styles['Package-Version']}>1.1.2  Public  Published 2 months ago</div>
                    </div>
                    <div className={styles['Package-Info']}>
                        <div className={styles['Package-Info-Readme']} dangerouslySetInnerHTML={readme} ></div>
                        <div className={styles['Package-Info-Statistics']}>
                            <div className={styles['Install-Title']}>Install</div>
                            <p><CopyToClipboard package={'test'} /></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}


