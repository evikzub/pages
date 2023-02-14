export default class FridgeService {

    measure = []

    static products = [
        {id: 1, name: 'Butter'},
        {id: 2, name: 'Milk'},
        {id: 3, name: 'Potato'},
        {id: 4, name: 'Sugar'},
        {id: 5, name: 'Solt'},
        {id: 6, name: 'Cucumber'},
        {id: 7, name: 'Sweet peper'},
        {id: 8, name: 'Pitted olive'},
        {id: 9, name: 'Red onion'},
        {id: 10, name: 'Feta cheese'},
        {id: 11, name: 'Oregano'},
        {id: 12, name: 'Extra virgin olive oil'},
        {id: 13, name: 'Chicken fillet'},
        {id: 14, name: 'Salad leaves'},
        {id: 15, name: 'Cherry tomatoes'},
        {id: 16, name: 'Parmesan cheese'},
        {id: 17, name: 'Paprica'},
        {id: 18, name: 'Sour cream'},
        {id: 19, name: 'Canned anchovies'},
        {id: 20, name: 'Parsley'},
        {id: 21, name: 'Egg'},
    ]

    static fridges = [
        {id: 1, name: 'Fridge'},
        {id: 2, name: 'Pantry'},
    ]

    static productsInFridge = [
        {fridgeId: 1, productId: 1, name: 'Butter', quantity: 1},
        {fridgeId: 1, productId: 2, name: 'Milk', quantity: 2},
        {fridgeId: 1, productId: 7, name: 'Sweet peper', quantity: 3},
        {fridgeId: 1, productId: 6, name: 'Cucumber', quantity: 4},
        {fridgeId: 1, productId: 21, name: 'Egg', quantity: 5},
    ]

    static productsInPantry = [
        {fridgeId: 2, productId: 4, name: 'Sugar', quantity: 1},
        {fridgeId: 2, productId: 3, name: 'Potato', quantity: 2},
        {fridgeId: 2, productId: 8, name: 'Pitted olive', quantity: 3},
    ]

    static getProducts (){
        return FridgeService.products;
    }

    static getFridges (){
        return FridgeService.fridges;
    }

    static getFridgeProducts (fridgeId){
        console.log('FridgeProducts: ', fridgeId)
        if (fridgeId === 1){
            return FridgeService.productsInFridge;
        }
        return FridgeService.productsInPantry;
    }
}