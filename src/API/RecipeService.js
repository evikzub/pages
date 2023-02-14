import FridgeService from "./FridgeService";

export default class ResipeService {


    static recipes = [
        {id: 1, name: "Fry potato", values: []},
        {id: 2, name: "borsch", values: []},
    ]

    static productsInRecipe = [
        {recipeId: 1, productId: 3, name: 'Potato', quantity: 2},
        {recipeId: 1, productId: 5, name: 'Solt', quantity: 1},
        {recipeId: 1, productId: 21, name: 'Egg', quantity: 3},
        {recipeId: 2, productId: 3, name: 'Potato', quantity: 3},
        {recipeId: 2, productId: 13, name: 'Chicken fillet', quantity: 2},
    ]

    static getProducts() {
        return FridgeService.products;
    }

    static getRecipes() {
        return ResipeService.recipes;
    }

    static getProductsByRecipe(recipe) {
        return this.productsInRecipe.filter(product => product.recipeId === recipe.id)
    }


}