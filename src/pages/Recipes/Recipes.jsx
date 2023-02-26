import React from 'react';
import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

import ResipeService from '../../API/RecipeService';

function Recipes(){
	const [recipes, setRecipes] = useState([]);

	//Init data
	useEffect (() => {
		//get list of Recipes
		setRecipes(ResipeService.getRecipes);
		//get list of Products
		//setProducts(FridgeService.getProducts);
	}, []);

	useEffect (() => {
		console.log('Recipes: ', recipes);
	}, [recipes]);

	const selectRecipe = (recipe) => {
		setRecipes(recipes.map(rec => {
			if (rec.id === recipe.id && rec.loaded === undefined){
				console.log('getProducst for recipe -> ');
				const products = ResipeService.getProductsByRecipe(recipe);
				return {...rec, loaded:true,  values: products};
			}
			return rec;
		}));
	};
    
	return(
		<div className='App'>
			<h1>Recipes</h1>
			<Accordion flush>
				{
					//console.log("")
					recipes.map((recipe) => {
						return (
							<Accordion.Item eventKey={recipe.id} key={recipe.id}>
								<Accordion.Header>{recipe.name}</Accordion.Header>
								<Accordion.Body onEnter={() => selectRecipe(recipe)}>
									{
										recipe.values.map(pr => {
											return (<div key={pr.recipeId+'_'+pr.productId}>{pr.name}</div>);
										})
									}
								</Accordion.Body>
							</Accordion.Item>
						);
					})    
				}
			</Accordion>
		</div>
	);
}

export default Recipes;