import React, {useState} from "react";
import {
    Routes,
    Route,
    Link,
  } from "react-router-dom";

import { Notfound } from '../pages/Notfound';
import ErrorPage from '../pages/Error-page';
import { HomePage } from '../pages/HomePage';
import { Layout } from '../components/UI/layout/Layout';
import { privateRoutes, publicRoutes } from '../router/routes';
import { Login } from '../pages/Login';
import { useContext } from "react";
import { AuthContext } from "../context";

const AppRouter = () => {
    //const [isAuth, setIsAuth] = useState(true);
    const {isAuth} = useContext(AuthContext)


    return (
        <>
            {(isAuth)
            ?
            <Routes>
                <Route path="/" element={<Layout/>} errorElement={<ErrorPage/>}>
                    <Route index element={<HomePage/>}/>
                    {privateRoutes.map(route => 
                        <Route path={route.path} element={route.component} key={route.path} />
                    )}
                    {/* <Route path="about"  element={<About/>}/>
                    <Route path="posts"  element={<Posts/>}/>
                    <Route path="posts/:id"  element={<PostIdPage/>}/>
                    <Route path="fridge" element={<Fridge/>}/>
                    <Route path="recipes" element={<Recipes/>}/> */}
                    <Route path="*" element={<Notfound/>} errorElement={<ErrorPage/>}/>
                </Route>
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route => 
                    <Route path={route.path} element={route.component} key={route.path} />
                )}
                <Route path="*" element={<Login/>} errorElement={<ErrorPage/>}/>
            </Routes>
            }
        </>

    )

}

export default AppRouter