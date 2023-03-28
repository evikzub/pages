//import StorageService from 'API/StorageService';
import { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getStorages } from 'shared/api/storage';


const StorageSelector = ({selectStorage}) => {
	
	const params = useParams();
	const [storages, setStorages] = useState([]);

	//Init data
	useEffect (() => {
		//get list of Storages
		//setStorages(StorageService.getStorages);
		const results = getStorages();
		results.then((storages) => setStorages(storages));
	}, []);

	//Storages loaded
	useEffect (() => {
		//set storage
		if (params.type){
			//console.log("Params: ", params)
			const storage = storages.filter(st => st.type === params.type);
			//console.log("Storage: ", storage[0])
			selectStorage(storage[0]);
		}
	}, [params.type, storages]);

	return (
		<ListGroup horizontal>
			{storages.map((storage) => 
				<ListGroup.Item action
					key={storage.id}  
					onClick={() => selectStorage(storage)}
				>
					{storage.name}
				</ListGroup.Item>
			)}                
		</ListGroup>
	);
};

export default StorageSelector;