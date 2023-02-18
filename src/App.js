import React, {useEffect, useState} from 'react';
import './styles/App.css';

import {
  BrowserRouter,
} from "react-router-dom";
import AppRouter from './components/AppRouter';
import { AuthContext, AuthProvider } from './context';



function App() {
  //const [isAuth, setIsAuth] = useState(false);

  // useEffect(()=> {
  //   if (localStorage.getItem('auth')){
  //     setIsAuth(true);
  //   }
  // }, [])

  return (
    <>
      {/* <AuthContext.Provider value={{
        isAuth,
        setIsAuth
      }}> */}
      <AuthProvider>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </AuthProvider>  
      {/* </AuthContext.Provider> */}
    </>
  )
}

export default App;
