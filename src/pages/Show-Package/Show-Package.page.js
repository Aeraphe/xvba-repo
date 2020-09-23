import React, { useEffect, useState } from 'react';
import styles from './Show-Package.module.css'
import { SearchShareComp } from "../../shared/components/Search/Search-comp-shared";
import marked from 'marked';
import DOMPurify from 'dompurify';
import { CopyToClipboard } from "../../shared/components/CopyToClipboard/CopyToClipboard-shared";
import PackageHttpService from '../../shared/services/packagesHttp.service';
import { useSelector, useDispatch } from 'react-redux';
import { searchPackagesThunk } from "../../shared/reducers/search-packages.slice";

export const ShowPackagePage = (props) => {
    const dispatch = useDispatch();

    const packages = useSelector(state => state.search_packages.entities);
    const packageDetails = packages.filter(item => item.name === props.match.params.package)[0]


    const [readme, setReadme] = useState({ __html: "<p>Loading...</p>" });
    useEffect(() => {
        (async () => {
            const data = await PackageHttpService.getPackageReadme(props.match.params.package);
            setReadme({ __html: DOMPurify.sanitize(marked(data)) })
        })()
        dispatch(searchPackagesThunk(props.match.params.package));
    }, [dispatch, props.match.params.package])
    return (

        <div className={styles['Container']}>
            <div className={styles['Search']}>
                <SearchShareComp></SearchShareComp>
            </div>
            <div className={styles['Content']}>
                <div className={styles['Content-Grid']}>
                    <div className={styles['Package-Title-Bar']}>
                        <div className={styles['Package-Title']}>{packageDetails?.name || ""}</div>
                        <div className={styles['Package-Version']}>Last Version: {packageDetails?.version.version || ""}  Published:  {(new Date(packageDetails?.version.create_ate).toDateString()) || ""}</div>
                    </div>
                    <div className={styles['Package-Info']}>
                        <div className={styles['Package-Info-Readme']} dangerouslySetInnerHTML={readme} ></div>
                        <div className={styles['Package-Info-Statistics']}>
                            <div className={styles['Install-Title']}>Install</div>
                            <p><CopyToClipboard package={packageDetails?.name || ""} /></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}


