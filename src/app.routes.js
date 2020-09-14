import React from 'react';
import { SearchPage } from './pages/Search/Search.page'
import { LoginPage } from './pages/Login/Login.page';
import { ShowPackagePage } from "./pages/Show-Package/Show-Package.page";
import { AdminPackagePage } from './pages/Admin-Package/Admin-Package.page';
import { Route } from 'react-router-dom';


export const routes = {
    protected: [
        <Route key="r4" path='/upload-package' exact component={AdminPackagePage}></Route>
    ],
    public: [
        <Route key="r1" path='/' exact component={SearchPage}></Route>,
        <Route key="r2" path='/login' exact component={LoginPage}></Route>,
        <Route key="r3" path='/show-package/:package' exact component={ShowPackagePage} ></Route>,
    ]
}


