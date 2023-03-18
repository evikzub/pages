import { Form, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import MyButton from 'shared/ui/button/MyButton';

import { removeProductFromStorage } from '../module/productsSlice';

const ProductRowView = ({product, selectProduct }) => {

	const dispatch = useDispatch();

	// const editProduct = (product) => {
	// 	//dispatch(selectProductInStorage({product}));
	// 	selectProduct(product);
	// };

	const deleteProduct = (product) => {
		dispatch(removeProductFromStorage({product}));
	};

	return (
		//<>
		<Row className='product' key={product.id} id={product.id}  >
			<Col md='6'>
				<Form.Label>Product</Form.Label>
				<div>{product.name}</div> 
			</Col>
			<Col md='3'>
				<Form.Label>Quantity</Form.Label>
				<div>{product.quantity}</div> 
			</Col>
			<Col style={{display:'flex', flexDirection: 'row-reverse'}} md='3'>
				<MyButton onClick= {() => deleteProduct(product)} >Delete</MyButton> 
				<MyButton onClick= {() => selectProduct(product)} >Edit</MyButton>
			</Col>
		</Row>
		//</>
	);
};

export default ProductRowView;