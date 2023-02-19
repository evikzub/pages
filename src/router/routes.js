import About from "../pages/About";
import Fridge from "../pages/Fridge";
//import { Login } from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import Recipes from "../pages/Recipes";

export const privateRoutes = [
    {path: 'posts', component: <Posts/> },
    {path: 'posts/:id', component: <PostIdPage/> },
    {path: 'fridge', component: <Fridge/> },
    {path: 'recipes', component: <Recipes/> },
]

export const publicRoutes = [
    //{path: '/', component: <Login/> },
    {path: 'about/*', component: <About/> },
]
