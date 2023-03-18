import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import ProductRowView from './ProductRowView';
import ProductRowEdit from './ProductRowEdit';

const ProductList = () => {

	const productsInStorage = useSelector(state => state.products.inStorage);

	const emptyProductInStorage = {id: 0, storageId: 0, productId: 0, name: '', quantity: 0};
	const [selectedProduct, setSelectedProduct] = useState(emptyProductInStorage);

	//Cancel function
	const cancelEdit = () => {
		setSelectedProduct(emptyProductInStorage);
	};

	return (
		<Container>
			{productsInStorage.map((product) => 
            
			//(product.isEdit !== null && !product.isEdit)
				(product.id !== selectedProduct.id)
					?
					<ProductRowView
						product={product} 
						selectProduct={setSelectedProduct}
						//editProduct={editProduct} 
						//deleteInStorage={deleteProductInStorage} 
					/>
					:
					<ProductRowEdit
						visible={true}
						selectedProduct={selectedProduct} 
						setSelectedProduct={setSelectedProduct}
						cancelEdit={cancelEdit}
					/>
            
			)}
		</Container>
	);
};

export default ProductList;