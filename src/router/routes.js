import About from '../pages/About';
import Storage from '../pages/Storage/Storage';
//import { Login } from "../pages/Login";
import { PostIdPage, postLoader } from '../pages/PostDetails/PostIdPage';
import Posts from '../pages/Posts/Posts';
import Recipes from '../pages/Recipes/Recipes';

export const privateRoutes = [
	{ path: 'posts', component: <Posts /> },
	//{ path: 'posts/:id', component: <PostIdPage />, loader: {postLoader} },
	{ path: 'storage', component: <Storage /> },
	{ path: 'storage/:type', component: <Storage /> },
	{ path: 'recipes', component: <Recipes /> },
];

export const publicRoutes = [
	//{path: '/', component: <Login/> },
	{ path: 'about/*', component: <About /> },
];
