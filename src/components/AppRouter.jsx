import React, {useState} from "react";
import {
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";

import { Notfound } from '../pages/Notfound';
import ErrorPage from '../pages/Error-page';
import { HomePage } from '../pages/HomePage';
import { Layout } from '../components/UI/layout/Layout';
import { privateRoutes, publicRoutes } from '../router/routes';
import { Login } from '../pages/Login';
//import { useContext } from "react";
//import { AuthContext } from "../context";
import RequireAuth from "../hoc/RequireAuth";

const AppRouter = () => {
    //const [isAuth, setIsAuth] = useState(true);
    //const {isAuth} = useContext(AuthContext)
    //const {user} = useContext(AuthContext)
    //console.log("AppRouter => user: ", user);

    return (
        <>
            {/* {(user)
            ? */}
            <Routes>
                <Route path="/login"  element={<Login/>}/>
                <Route path="/" element={<Layout/>} errorElement={<ErrorPage/>}>
                    <Route index element={<HomePage/>}/>
                    {privateRoutes.map(route => 
                        <Route path={route.path} 
                        element={
                            <RequireAuth>
                            {route.component}
                            </RequireAuth>
                        } 
                        key={route.path} />
                    )}
                    {/* 
                    <Route path="about"  element={<About/>}/>
                    <Route path="posts"  element={<Posts/>}/>
                    <Route path="posts/:id"  element={<PostIdPage/>}/>
                    <Route path="fridge" element={<Fridge/>}/>
                    <Route path="recipes" element={
                        <RequireAuth>
                            <Recipes/>
                        </RequireAuth>}/> 
                    */}
                    {publicRoutes.map(route => 
                        <Route path={route.path} element={route.component} key={route.path} />
                    )}
                    <Route path="about-us" element={<Navigate to="/about" replace />}/>
                    <Route path="*" element={<Notfound/>} errorElement={<ErrorPage/>}/>
                </Route>
            </Routes>
            {/* :
            <Routes>
                {publicRoutes.map(route => 
                    <Route path={route.path} element={route.component} key={route.path} />
                )}
                <Route path="*" element={<Login/>} errorElement={<ErrorPage/>}/>
            </Routes>
            } */}
        </>

    )

}

export default AppRouter