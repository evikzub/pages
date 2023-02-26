import { useState } from 'react';
import { Link } from 'react-router-dom';

import pantryImg from '../shared/img/pantry.jpeg';
import fridgeImg from  '../shared/img/fridge.png';
import fridgeImgOpen from '../shared/img/fridge_open.png';

export const HomePage = () => {
	const [fridge, setFridge] = useState(fridgeImg);
  
	// function hover(element) {
	//     console.log("Element", element.target.src);
	//     //element.setAttribute('src', {fridgeImgOpen});
	//     //element.target.src = {fridgeImgOpen}
	//     //element.target.setAttribute('src', {fridgeImgOpen});
	//     //console.log("Element", element.target.src);
	//     setFridge(fridgeImgOpen);  
	// }

	return (
		<div>
			<span>
				<Link to={'/storage/fridge'}>
					<img src={fridge} style={{width: '50%', height: '50%'}} alt='What is in Fridge?'
						onMouseEnter={() => setFridge(fridgeImgOpen)}
						onMouseOut={() => setFridge(fridgeImg)}  
					/>
				</Link>
			</span>
			<span>
				<Link to={'/storage/pantry'}>
					<img src={pantryImg} style={{width: '25%', height: '25%'}} alt='What is in Pantry?'
					/>
				</Link>
			</span>    
		</div>
	);
};