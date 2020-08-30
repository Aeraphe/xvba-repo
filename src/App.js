import React from 'react';
import './App.css';
import fb from "firebase/app";
import { firebaseConfig } from "./shared/services/firebase.config";
import {Header} from './template/Header';
import { HomePage } from './pages/Home/Home.page';
 // Initialize Firebase
 fb.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
     <Header></Header>
     <HomePage></HomePage>
    </div>
  );
}

export default App;
