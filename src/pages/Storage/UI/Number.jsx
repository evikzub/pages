import { Form } from 'react-bootstrap';

const Number = ({name, value, updateValue}) => {
	return (
		<div>
			<Form.Label>{name}</Form.Label>
			<Form.Control type='number' name={name} min={0} value={value}
				onChange={(e) => updateValue(e.target.value)}
			/>
		</div>
	);
};

export default Number;