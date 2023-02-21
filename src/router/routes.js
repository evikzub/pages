import About from "../pages/About";
import Storage from "../pages/Storage";
//import { Login } from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import Recipes from "../pages/Recipes";

export const privateRoutes = [
    {path: 'posts', component: <Posts/> },
    {path: 'posts/:id', component: <PostIdPage/> },
    {path: 'storage', component: <Storage/> },
    {path: 'storage/:type', component: <Storage/> },
    {path: 'recipes', component: <Recipes/> },
]

export const publicRoutes = [
    //{path: '/', component: <Login/> },
    {path: 'about/*', component: <About/> },
]
