//import productData from './products.json';

export default class StorageService {
	measure = [];

	static products = [
		{ id: 1, name: 'Butter' },
		{ id: 2, name: 'Milk' },
		{ id: 3, name: 'Potato' },
		{ id: 4, name: 'Sugar' },
		{ id: 5, name: 'Solt' },
		{ id: 6, name: 'Cucumber' },
		{ id: 7, name: 'Sweet peper' },
		{ id: 8, name: 'Pitted olive' },
		{ id: 9, name: 'Red onion' },
		{ id: 10, name: 'Feta cheese' },
		{ id: 11, name: 'Oregano' },
		{ id: 12, name: 'Extra virgin olive oil' },
		{ id: 13, name: 'Chicken fillet' },
		{ id: 14, name: 'Salad leaves' },
		{ id: 15, name: 'Cherry tomatoes' },
		{ id: 16, name: 'Parmesan cheese' },
		{ id: 17, name: 'Paprica' },
		{ id: 18, name: 'Sour cream' },
		{ id: 19, name: 'Canned anchovies' },
		{ id: 20, name: 'Parsley' },
		{ id: 21, name: 'Egg' },
	];

	static storages = [
		{ id: 1, name: 'Fridge', type: 'fridge' },
		{ id: 2, name: 'Pantry', type: 'pantry' },
	];

	static productsInFridge = [
		{ id: 1, storageId: 1, productId: 1, name: 'Butter', quantity: 1 },
		{ id: 2, storageId: 1, productId: 2, name: 'Milk', quantity: 2 },
		{ id: 3, storageId: 1, productId: 7, name: 'Sweet peper', quantity: 3 },
		{ id: 4, storageId: 1, productId: 6, name: 'Cucumber', quantity: 4 },
		{ id: 5, storageId: 1, productId: 21, name: 'Egg', quantity: 5 },
	];

	static productsInPantry = [
		{ id: 6, storageId: 2, productId: 4, name: 'Sugar', quantity: 1 },
		{ id: 7, storageId: 2, productId: 3, name: 'Potato', quantity: 2 },
		{ id: 8, storageId: 2, productId: 8, name: 'Pitted olive', quantity: 3 },
	];

	static getProducts() {
		return StorageService.products;
		//return productData;
	}

	static getStorages() {
		return StorageService.storages;
	}

	static getProductsByStorageId(storgeId) {
		//console.log('StorageProducts: ', storgeId);
		if (storgeId === 1) {
			return StorageService.productsInFridge;
		}
		return StorageService.productsInPantry;
	}
}
