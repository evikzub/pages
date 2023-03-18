import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { 
	fetchProducts, 
	fetchProductsInStorage,
} from './module/productsSlice';
import StorageSelector from './components/StorageSelector';
import ProductList from './components/ProductList';
import ProductInsert from './components/ProductInsert';

function Storage (){

	const [selectedStorage, setSelectedStorage] = useState({id: 0, name: '', type: ''});
	
	const dispatch = useDispatch();

	//Init data
	useEffect (() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	//Storage selected
	useEffect (() => {
		//console.log('Storage selection');
		if (selectedStorage === undefined || selectedStorage.id === 0){
			dispatch(fetchProductsInStorage(0));	
			return;
		}

		dispatch(fetchProductsInStorage(selectedStorage.id));
	}, [selectedStorage, dispatch]);

	return(
		<div className='App'>
			<h1>Storage</h1>

			<StorageSelector selectStorage={setSelectedStorage} />

			<hr style={{margin: '15px 0'}}/>

			<ProductInsert selectedStorage={selectedStorage} />

			<hr style={{margin: '15px 0'}}/>

			<ProductList />
		</div>
	);
}

export default Storage;
