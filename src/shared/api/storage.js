import { apiServerInstance } from './base';

const STORAGES_URL = '/storages';
const PRODUCTS_URL = '/products';
const STORAGE_PRODUCTS_URL = '/productsInStorage';

export async function getStorages() {
	try {
		const response = await apiServerInstance.get(`${STORAGES_URL}`);
		return await response.data;
	} catch (e) {
		console.log(e);
	}
}

export async function getProducts() {
	try {
		const response = await apiServerInstance.get(`${PRODUCTS_URL}`);
		return response;
	} catch (e) {
		console.log(e);
	}
}

export function getProductsInStorage(storageId) {
	try {
		//const response = apiServerInstance.get(`${STORAGE_PRODUCTS_URL}?storageId=${storageId}`);
		const response = apiServerInstance.get(`${STORAGE_PRODUCTS_URL}`, {
			params: {
				storageId,
			},
		});
		return response;
	} catch (e) {
		console.log('Error -> ', e);
	}
};