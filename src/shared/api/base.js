import axios from 'axios';

import { API_URL } from '../config';
import { API_SERVER } from '../config';

export const apiTestInstance = axios.create({ baseURL: API_URL });

export const apiServerInstance = axios.create({ baseURL: API_SERVER });