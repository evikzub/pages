import { Link } from 'react-router-dom';

export const Notfound = () => {
	return (
		<div>
            This page does not exist. Go <Link to={'/'}>Home</Link>
		</div>
	);
};