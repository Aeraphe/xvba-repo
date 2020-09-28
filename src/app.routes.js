import React from 'react';
import { SearchPage } from './pages/Search/Search.page'
import { LoginPage } from './pages/Login/Login.page';
import { ShowPackagePage } from "./pages/Show-Package/Show-Package.page";
import { AdminPackagePage } from './pages/Admin-Package/Admin-Package.page';
import { PrivacyPolicyPage } from './pages/Privacy-Policy/Privacy-Policy.page'
import { TermsPage } from './pages/Terms/Terms.page';
import { VscodeExtensionPage } from './pages/Vscode-Extension/Vscode-Extension-Page';
import { XvbaCliPage } from './pages/Xvba-Cli/Xvba-Cli-Page';
import {AboutPage} from './pages/About/About-page'
import {TutorialPage} from './pages/Tutorial/Tutorial-page'
import { Route } from 'react-router-dom';


export const routes = {
    protected: [
        <Route key="r4" path='/upload-package' exact component={AdminPackagePage}></Route>
    ],
    public: [
        <Route key="r1" path='/' exact component={SearchPage}></Route>,
        <Route key="r2" path='/login' exact component={LoginPage}></Route>,
        <Route key="r3" path='/show-package/:package' exact component={ShowPackagePage} ></Route>,
        <Route key="r5" path='/privacy' exact component={PrivacyPolicyPage} ></Route>,
        <Route key="r6" path='/terms' exact component={TermsPage} ></Route>,
        <Route key="r7" path='/xvba-extension' exact component={VscodeExtensionPage}></Route>,
        <Route key="r8" path='/xvba-cli' exact component={XvbaCliPage}></Route>,
        <Route key="r9" path='/about' exact component={AboutPage}></Route>,
        <Route key="r10" path='/tutorial' exact component={TutorialPage}></Route>,
    ]
}


