import StorageService from 'API/StorageService';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async function (_, {dispatch}) {
		const values = StorageService.getProducts();
		dispatch(initProducts(values));
	}
);

export const fetchProductsInStorage = createAsyncThunk(
	'products/fetchProductsInStorage',
	async function (id, {dispatch}) {
		let values = [];
		if (id !==0 ) values = StorageService.getProductsByStorageId(id);
		dispatch(initProductsInStorage(values));
	}
);

//const emptyProductInStorage = {id: 0, storageId: 0, productId: 0, name: '', quantity: 0};

const getProductsForUse = (products, producstInStorage) => {
	const productsForUse =[];
	//Taking all products we have
	products.forEach(product => {
		//checking if product is in Storage
		const lookUp = producstInStorage.filter(stProduct => {
			if (stProduct.productId === product.id){
				return true;
			}
			return false;
		});
		//console.log("Product.ID: ", product.id, " lookUp: ", lookUp)

		//if product not in storage => push it to the list
		if (lookUp.length === 0){
			productsForUse.push(product);
		};
	});
	return productsForUse;
};

const productsSlice = createSlice({
	name: 'products',
	initialState: {
		allProducts: [],
		inStorage: [],
		forUse: [],
		//selectedProduct: emptyProductInStorage,
		//newProduct: emptyProductInStorage,
		status: null,
		error: null,
	},
	reducers: {
		initProducts (state, action){
			//initial products list
			//console.log('initProducts ', action);
			state.allProducts = action.payload;
		},
		
		initProductsInStorage (state, action){
			//initial data in Storage
			//console.log('initStorage ', action.payload);
			state.inStorage = action.payload;
			state.forUse = getProductsForUse(state.allProducts, state.inStorage);
		},

		// selectProductInStorage(state, action){
		// 	if (action.payload === null){
		// 		state.selectedProduct = emptyProductInStorage;
		// 	}
		// 	else{
		// 		state.selectedProduct = action.payload.product;
		// 	}
		// },

		// setNewProductForStorage(state, action){
		// 	if (action.payload === null){
		// 		state.newProduct = emptyProductInStorage;
		// 	}
		// 	else{
		// 		state.newProduct = action.payload.product;
		// 	}
		// },

		addProductToStorage(state, action){
			//console.log('Add product ->>', action.payload);
			if (action.payload === null){
				//state.newProduct = emptyProductInStorage;
			}
			else{
				state.inStorage.push(action.payload.product);
				state.forUse = getProductsForUse(state.allProducts, state.inStorage);
				//state.newProduct = emptyProductInStorage;
			}

			//const product = {...newProduct, storageId: selectedStorage.id};
			//setNewProduct(product);
			//console.log('Insert Product: ', product);
			
			//state.inStorage.push(action.payload.product);
			//setPoductsInStorage([...productsInStorage, product]);
			//setNewProduct(emptyProductInStorage);
		},

		updateProductInStorage(state, action){
			//Modify if Product is in Edit mode
			//const originalId = action.payload.originalId;
			const updatedProduct = action.payload.product;
			//console.log('Product for Save: ', updatedProduct);
			const newSetOfProducts = state.inStorage.map((prInStorage) => 
				(prInStorage.id === updatedProduct.id) ? updatedProduct : prInStorage
			);
			//console.log('Products after save: ', newSetOfProducts);
			state.inStorage = newSetOfProducts;
			state.forUse = getProductsForUse(state.allProducts, newSetOfProducts);
			//state.selectedProduct = emptyProductInStorage;
		},
		
		removeProductFromStorage(state, action){
			const deletedProduct = action.payload.product;
			state.inStorage = state.inStorage.filter(product => product.productId !== deletedProduct.productId);
		},
	}, 
	// extraReducers: (builder) => {
	// 	builder.addCase(fetchProducts.fulfilled, (state, action) => {
	// 		//console.log('success state', state);
	// 		//console.log('success action', action);
	// 		//state.products = action.payload;

	// 	});
	// 	// [fetchProducts.pending]: (state, action) => {
	// 	// 	//console.log('pebding state', state);
	// 	// 	//console.log('pebding action', action);
	// 	// },
	// 	// [fetchProducts.fulfilled]: (state, action) => {
	// 	// 	//console.log('success state', state);
	// 	// 	//console.log('success action', action);
	// 	// 	//loadProducts(action.payload);
	// 	// 	//state.products = action.payload;

	// 	// },
	// 	// [fetchProducts.rejected]: (state, action) => {},
	// },
});

const { initProducts, initProductsInStorage } = productsSlice.actions;

export const { 
	addProductToStorage, 
	updateProductInStorage, 
	removeProductFromStorage, 
	//selectProductInStorage,
} = productsSlice.actions;

export default productsSlice.reducer;