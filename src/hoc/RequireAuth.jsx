import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';


const RequireAuth = ({children}) => {
	const location = useLocation();
	const {user} = useAuth();

	//console.log("RequireAuth => user", user);

	if (!user) {
		//console.log("RequireAuth => Navigate to login => location ", location);
		return <Navigate to='/login' state={{from: location}} replace='false' />;
	}

	return children;
};

export default RequireAuth;