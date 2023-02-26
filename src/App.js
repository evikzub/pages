// import React from 'react';
import './styles/App.css';

import { BrowserRouter } from 'react-router-dom';
import AppRouter from 'router/AppRouter';
import { AuthProvider } from 'context';
// import { API_URL } from 'shared/config';

function App() {
	// const [isAuth, setIsAuth] = useState(false);

	// useEffect(()=> {
	//   if (localStorage.getItem('auth')){
	//     setIsAuth(true);
	//   }
	// }, [])
	// console.log(API_URL);

	return (
		<>
			{/* <AuthContext.Provider value={{
          isAuth,
          setIsAuth
        }}> */}
			<AuthProvider>
				<BrowserRouter>
					<AppRouter />
				</BrowserRouter>
			</AuthProvider>
			{/* </AuthContext.Provider> */}
		</>
	);
}

export default App;
