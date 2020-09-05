import React from 'react';
import './App.css';
import fb from "firebase/app";
import { firebaseConfig } from "./shared/services/firebase.config";
import { Template } from './Template/Template';
import { BrowserRouter } from "react-router-dom";
import { Route } from 'react-router-dom';
import { SearchPage } from './pages/Search/Search.page'
import { LoginPage } from './pages/Login/Login.page';
import { ShowPackagePage } from "./pages/Show-Package/Show-Package.page";
import { AdminPackagePage } from './pages/Admin-Package/Admin-Package.page';
import { Provider } from "react-redux";
import  store from "./store";
// Initialize Firebase
fb.initializeApp(firebaseConfig);


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
       
          <Template>
            <Route path='/' exact component={SearchPage}></Route>
            <Route path='/login' exact component={LoginPage}></Route>
            <Route path='/show-package/:package' exact component={ShowPackagePage} ></Route>
            <Route path='/upload-package' exact component={AdminPackagePage}></Route>
          </Template>
       
      </BrowserRouter>
    </Provider>


  );
}

export default App;
