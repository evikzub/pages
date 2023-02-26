//import axios from 'axios';

import { apiInstance } from './base';

const BASE_URL = '/posts';

export function getAllPosts(limit = 10, page = 1) {
	try {
		const response = apiInstance.get(`${BASE_URL}`, {
			params: {
				_limit: limit,
				_page: page,
			},
		});
		return response;
	} catch (e) {
		console.log(e);
	}
}

// export function getPostById(id){
//     try{
//         const result = fetch(`${BASE_URL}/${id}`)
//             //.then(res => res.json())
//             //.then((data) => console.log('res: ',data));
//         return result.json();
//     } catch(e) {
//         console.log("Error -> ", e)
//     }
// }

export function getPostById(postId) {
	try {
		const response = apiInstance.get(`${BASE_URL}/${postId}`);
		return response;
	} catch (e) {
		console.log('Error -> ', e);
	}
}

export function getCommentsByPostId(postId) {
	try {
		const response = apiInstance.get(`${BASE_URL}/${postId}/comments`);
		return response;
	} catch (e) {
		console.log('Error -> ', e);
	}
}
