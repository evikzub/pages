import { useState } from 'react';
import MyButton from 'shared/ui/button/MyButton';

import ProductRowEdit from './ProductRowEdit';

const ProductInsert = ({ selectedStorage }) => {

	const [visible, setVisible] = useState(false);

	const emptyProductInStorage = {id: 0, storageId: 0, productId: 0, name: '', quantity: 0};
	const [newProduct, setNewProduct] = useState(emptyProductInStorage);

	//Allows open form to add new product
	const enableAdd = () => {
		//console.log('Enable edit -> ', selectedStorage.id);
		setVisible(selectedStorage.id!==0);		
		setNewProduct({...newProduct, storageId: selectedStorage.id});
	};

	const cancelEdit = () => {
		setNewProduct(emptyProductInStorage);
		setVisible(false);
	};

	return (
		<div>
        	<MyButton style={{width: '150px', margin: '15px 0'}} onClick={() => enableAdd()} >Add Product</MyButton>

			<ProductRowEdit
				visible={visible}
				selectedProduct={newProduct} 
				setSelectedProduct={setNewProduct}
				cancelEdit={cancelEdit}
			/>
		</div>
	);
};

export default ProductInsert;