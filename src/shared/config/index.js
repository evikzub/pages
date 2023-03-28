// getting environment parameter
const getEnvVar = (key) => {
	if (process.env[key] === undefined) {
		throw new Error(`Env variable ${key} is required`);
	}
	return process.env[key] || '';
};

export const API_URL = getEnvVar('REACT_APP_API_URL');

export const API_SERVER = getEnvVar('REACT_APP_API_SERVER');
