import React from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addProductToStorage, updateProductInStorage } from '../module/productsSlice';
import Number from '../UI/Number';
import ProductSelect from '../UI/ProductSelect';

const ProductRowEdit = ({visible, 
	selectedProduct,  
	setSelectedProduct, 
	cancelEdit}) => {

	const dispatch = useDispatch();

	const [validated, setValidated] = useState(false);
	const productsForUse = useSelector(state => state.products.forUse);

	const submitData = (event) => {
		event.preventDefault();
		const form = event.currentTarget;

		//validation
		if (!form.checkValidity()){
			event.stopPropagation();
			setValidated(true);
			return;
		}

		//setSelectedProduct( productInSorage );
		if (selectedProduct.id === 0){
			const newProduct = {...selectedProduct, id: Date.now()};
			dispatch(addProductToStorage({product: newProduct}));

		}
		else{
			dispatch(updateProductInStorage({product: selectedProduct}));
		}

		emptyData();
	};

	const emptyData = () => {
		//console.log('Cancel data');
		setValidated(false);
		//setVisible(false);
		cancelEdit();
	};

	return (
		<Row key={selectedProduct.id} >
			<Form noValidate validated={validated}
				onSubmit={submitData} autoComplete='off'
				className='product' 
				style={{display: (visible) ? 'flex' : 'none', gap: '1rem'}}
			> 
				<Form.Group as={Col} md='6' >
					<ProductSelect name='Product' 
						options={productsForUse}
						value={(selectedProduct.productId === 0)? 
							null : {id: selectedProduct.productId, name: selectedProduct.name}}
						updateValue={(value) => 
							setSelectedProduct({...selectedProduct, productId: value.id, name: value.name})}
					/>
				</Form.Group>
				<Form.Group as={Col} md='3'>
					<Number name='Quantity' value={selectedProduct.quantity} 
						updateValue={(value) => setSelectedProduct({...selectedProduct, quantity: value})} />
				</Form.Group>
				<Form.Group as={Col} md='3' style={{placeSelf: 'center'}}>
					<Button type='submit' >Save</Button>
					<div className='vr' />
					<Button variant='secondary' onClick={emptyData}>Cancel</Button>
				</Form.Group>
			</Form>
		</Row>
	);
};

export default ProductRowEdit;
