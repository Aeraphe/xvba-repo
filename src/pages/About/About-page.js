import React, { useEffect } from "react";
import styles from './About-page.module.css'
import ReactGA from 'react-ga';

export const AboutPage = () => {
    useEffect(() => {
        ReactGA.event({
            category: 'About',
            action: 'Access About Page'
        });
    })
    return (
        <div className={styles['Container']}>
            <div className={styles['Content']}>
                <h1> About XVBA</h1>
                <p> Xvba Repository is under construction version "b"</p>
                <p>Some features may not working or fail</p>
                <p>You can test and create your packages with Xvba-cli</p>
                <h4>Some example packages are:</h4>
                <ul>
                    <li>excel-types</li>
                    <li>linear</li>
                </ul>


                <h3>Support XVBA </h3>
                <p> If you find it useful, please consider supporting it. </p>
                <p>Become a <a href="https://www.patreon.com/aeraphe"> Sponsor </a> - join the growing group of generous backers</p>

Also <b>please</b> write a review, star me on <b>GitHub</b>, and follow me on github.<br />
My desirer and my passion is to create a useful tool for many people it's possible
<br /><br /><b>Thanks to every one that are using XVBA</b>
                <br /> More and more features will came..
            </div>
        </div>
    )
}