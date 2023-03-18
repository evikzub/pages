import { Form } from 'react-bootstrap';
import Select from 'react-select';

const ProductSelect = ({name, options, value, updateValue}) => {
	return (
		<div>
			<Form.Label>{name}</Form.Label>
			<Select 						
				options={options}
				name={name}
				placeholder='Select product...'
				getOptionValue={(option) => `${option['id']}`}
				getOptionLabel={(option) => `${option['name']}`}
				//defaultValue={(selectedProduct.productId === 0)? 
				//    null : {id: selectedProduct.productId, name: selectedProduct.name}}
				value={value}
				onChange={(value) => updateValue(value)}
			/>
			{/* Validation -> check how to improve it */}
			<Form.Control type='text' 
				defaultValue={value? value.name : null} required style={{display: 'none'}}/>
			<Form.Control.Feedback type='invalid'>
					Please select a product.
			</Form.Control.Feedback>
		</div>
	);
};

export default ProductSelect;