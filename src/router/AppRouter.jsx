import React from 'react';
import {
	Route,
	Navigate,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from 'context';


import { PostIdPage, postLoader } from 'pages/PostDetails/PostIdPage';
import { Login } from 'pages/Login';
import { Notfound } from 'pages/Notfound';
import ErrorPage from 'pages/Error-page';
import { HomePage } from 'pages/HomePage';

import { Layout } from 'components/UI/layout/Layout';

import RequireAuth from '../hoc/RequireAuth';

import { privateRoutes, publicRoutes } from './routes';

const AppRouter = () => {
	//const [isAuth, setIsAuth] = useState(true);
	//const {isAuth} = useContext(AuthContext)
	//const {user} = useContext(AuthContext)
	//console.log("AppRouter => user: ", user);

	const router = createBrowserRouter(createRoutesFromElements(
		<>
			<Route path='/login'  element={<Login/>}/>
			<Route path='/' element={<Layout/>} errorElement={<ErrorPage/>}>
				<Route index element={<HomePage/>}/>
				{privateRoutes.map(route => 
					<Route path={route.path} 
						element={
							<RequireAuth>
								{route.component}
							</RequireAuth>
						}
						//loader={route.loader}
						key={route.path} />
				)}
				<Route path='posts/:id' 
					element={
						<RequireAuth>
							<PostIdPage/>
						</RequireAuth>
					}
					loader={postLoader}
				/>
				{publicRoutes.map(route => 
					<Route path={route.path} element={route.component} key={route.path} />
				)}
				<Route path='about-us' element={<Navigate to='/about' replace />}/>
				<Route path='*' element={<Notfound/>} errorElement={<ErrorPage/>}/>
			</Route>
		</>    
	));

	return (
		<AuthProvider>
			<RouterProvider router={router}/>
		</AuthProvider>
	);

};

export default AppRouter;