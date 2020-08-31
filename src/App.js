import React from 'react';
import './App.css';
import fb from "firebase/app";
import { firebaseConfig } from "./shared/services/firebase.config";
import { Template } from './Template/Template';
import { BrowserRouter } from "react-router-dom";
import { Route } from 'react-router-dom';
import { SearchPage } from './pages/Search/Search.page'
// Initialize Firebase
fb.initializeApp(firebaseConfig);

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Template>

        </Template>
        <Route path='/' exact component={SearchPage}></Route>
      </div>
    </BrowserRouter>

  );
}

export default App;
