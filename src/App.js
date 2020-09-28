import React, { useEffect } from 'react';
import './App.css';
import fb from "firebase/app";
import { firebaseConfig } from "./shared/services/firebase.config";
import { Template } from './Template/Template';
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import { checkUserLogged } from "./shared/reducers/authenticationSlice";
import { routes } from "./app.routes";
import { DBServices } from "./shared/services/indexddb/db.service";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-176345056-1');
ReactGA.pageview(window.location.pathname + window.location.search);

// Initialize Firebase
fb.initializeApp(firebaseConfig);


function App() {
  (async () => { await DBServices.create() })()

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Template>
          <Switch>
            <RouteGuard />
          </Switch>
        </Template>
      </BrowserRouter>
    </Provider>
  );
}


const RouteGuard = () => {

  let isLogged = useSelector(state => state.auth.isLogged);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserLogged());
  })


  return (isLogged ? [...routes.protected, ...routes.public] : routes.public)

}
export default App;
