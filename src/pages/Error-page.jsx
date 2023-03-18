import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
	const error = useRouteError();
	//console.error(error);
	//isRouteErrorResponse(error)

	return (
		<div id='error-page'>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error.status}</i>
				<i>{error.statusText || error.message || 'Something went wrong!' }</i>
			</p>
		</div>
	);
};