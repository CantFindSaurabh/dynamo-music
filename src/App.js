import './App.css';
import { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { auth } from './config/firebase-config';


import Layout from './components/Layout/Layout'

import Authentication from './components/Authentication/Authentication';
import BackDrop from './components/UI/BackDrop/BackDrop';
import Spinner from './components/UI/Spinner/Spinner';

const Player = lazy(() => import("./components/Player/Player"));
 

function App() {

  const [appState, setAppState] = useState({
    currentUser:null,

  })
  
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      setAppState({
        currentUser:user
      })
    })
  },[])

  return (
    <BrowserRouter>
      <div className="App">

        <Suspense fallback={<Fragment><BackDrop /><Spinner /></Fragment>}>

          {
            appState.currentUser ? <Redirect to="/player" /> : <Redirect to="/authenticate" exact />
          }
          <Route path="/authenticate" exact render={(props) => <Authentication {...props} />} />
          <Route path="/player" render={(props) => <Layout > <Player {...props} /> </Layout>} />
        </Suspense>

      </div>
    </BrowserRouter>
  );
}

export default App;
