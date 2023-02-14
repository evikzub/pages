import React, { useEffect, useState } from "react";
import FridgeService from "../API/FridgeService";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyButton from "../components/UI/button/MyButton";
import { Form } from "react-bootstrap";
import FridgeForm from "../components/FridgeForm";


function Fridge (){
    const [visible, setVisible] = useState(false);

    const [fridges, setFridges] = useState([]);
    const [selectedFridge, setSelectedFridge] = useState({id: 0, name: ''});
    const [products, setProducts] = useState([]);
    const [productsInFridge, setPoductsInFridge] = useState([]);
    const [productsToSelect, setProductsToSelect] = useState([]);

    const emptyProductInFridge = {fridgeId: 0, productId: 0, name: '', quantity: 0, isEdit: false};
    const [storedID, setStoredID] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(emptyProductInFridge);
    const [newProduct, setNewProduct] = useState(emptyProductInFridge);

    //Init data
    useEffect (() => {
        //get list of Fridges
        setFridges(FridgeService.getFridges);
        //get list of Products
        setProducts(FridgeService.getProducts);
    }, [])

    //Fridge selected
    useEffect (() => {
        if (selectedFridge.id ===0){
            return;
        }

        console.log("useEffect for selectedFridge")
        //get list of products in fridge
        const fridgeProducts = FridgeService.getFridgeProducts(selectedFridge.id);
        setPoductsInFridge(fridgeProducts);
    }, [selectedFridge])

    //Products in Fridge selected 
    useEffect (() => {
        if (productsInFridge.length ===0){
            return;
        }        
        console.log("useEffect for productsInFridge: "); //, productsInFridge)
        //clear products for unique seles
        productsForSelect(productsInFridge);
    }, [productsInFridge]) //?

    // //? For test -> to remove
    // useEffect (() => {
    //     //if (productsInFridge.length ===0){
    //     //    return;
    //     //}        
    //     console.log("useEffect for selectedProduct: ", selectedProduct)
    //     //productsForSelect(productsInFridge);
    // }, [selectedProduct])

    //List of products not in fridge
    const productsForSelect = (fridgeProducts) => {
        const productsForUse =[];
        //Taking all products we have
        products.forEach(product => {
            //checking if product is in fridge
            const lookUp = fridgeProducts.filter(frProduct => {
                if (frProduct.productId === product.id){
                    return true;
                }
                return false;
            })
            //console.log("Product.ID: ", product.id, " lookUp: ", lookUp)

            //if product not in fridge => push it to the list
            if (lookUp.length === 0){
                productsForUse.push(product);
            }
        })
        //console.log(productsForUse);
        //store list for Select
        setProductsToSelect(productsForUse);
    }

    //Select Fridge
    const selectFridge = (fridge) => {
        //console.log('selectFridge: ', fr);
        setSelectedFridge(fridge);
    }

    //Allows open form to add new product
    const enableAdd = () => {
        setVisible(selectedFridge.id!==0);
        setNewProduct(emptyProductInFridge);
    }

    //Indicate product in the list for Edit
    const updateProductsInFridge = (prod, originalId, isEdit) => {
        //Modify if Product is in Edit mode
        const savedProduct = {...prod, isEdit: isEdit}
        console.log("Product for Save: ", savedProduct);
        const newSetOfProducts = productsInFridge.map((prInFridge) => 
            (prInFridge.productId === originalId) ? savedProduct : {...prInFridge, isEdit: false}
            );
        console.log("Products after save: ", newSetOfProducts)
        setPoductsInFridge(newSetOfProducts);
    }

    //Edit finction
    const editProduct = (prod, isEdit) => {
        updateProductsInFridge(prod, prod.productId, isEdit)
        if(isEdit){
            setSelectedProduct(prod);
            console.log("Store ID: ", prod.productId)
            setStoredID(prod.productId);       
        }
    }

    //Cancel function
    const cancelEdit = () => {
        //enableView(prod);
        console.log("Cancel Edit")
        updateProductsInFridge(selectedProduct, selectedProduct.productId, false)
        setVisible(selectedProduct.productId === 0)
    }


    //Update product
    const saveProductInFridge = () => {   
        console.log("Save product ->>")
        console.log("Updated Product: ", selectedProduct)
        updateProductsInFridge(selectedProduct, storedID, false)
        //cancelEdit();//?     
        //console.log("selectedFridge: ", selectedFridge)
    }

    //Add product
    const addProductInFridge = () => {
        console.log("Add product ->>")
        const product = {...newProduct, fridgeId: selectedFridge.id} 
        setNewProduct(product)
        console.log("Insert Product: ", product)
        setPoductsInFridge([...productsInFridge, product])
        setNewProduct(emptyProductInFridge)
        //setVisible(false)
    }

    //Delete product
    const deleteProductInFridge = (prod) => {
        console.log("Delete product ->>")
        setPoductsInFridge(productsInFridge.filter(product => product.productId !== prod.productId));

    }

    //View mode for product
    const viewRow = (prInFridge) => {
        return (
            //<>
            <Row className='product' key={prInFridge.productId}>
                <Col md="6">
                    <Form.Label>Product</Form.Label>
                    <div>{prInFridge.name}</div> 
                </Col>
                <Col md="3">
                    <Form.Label>Quantity</Form.Label>
                    <div>{prInFridge.quantity}</div> 
                </Col>
                <Col style={{display:'flex', flexDirection: 'row-reverse'}} md="3">
                    <MyButton onClick={() => deleteProductInFridge(prInFridge)} >Delete</MyButton> 
                    <MyButton onClick={e => editProduct(prInFridge, true)}>Edit</MyButton>
                </Col>
            </Row>
            //</>
        )
    }

    //Edit mode for product
    const editRow = (prInFridge) => {
        //setVisible(false)

        return (
            //<>
            <Row key={prInFridge.productId} >
                <FridgeForm
                    visible={true}
                    selectedProduct={selectedProduct} 
                    productsToSelect={productsToSelect}
                    setSelectedProduct={setSelectedProduct}
                    saveProductInFridge={saveProductInFridge}
                    cancelEdit={cancelEdit}
                />
            </Row>
            //</>
        )
    }

    return(
        <div className="App">
            <h1>Fridge</h1>
            <ListGroup horizontal>
                {fridges.map((fr) => 
                    <ListGroup.Item key={fr.id} action onClick={() => selectFridge(fr)}>{fr.name}</ListGroup.Item>
                )}                
            </ListGroup>

            <hr style={{margin: '15px 0'}}/>

            <MyButton style={{width: '150px', margin: '15px 0'}} onClick={() => enableAdd()} >Add Product</MyButton>

            <FridgeForm
                visible={visible}
                selectedProduct={newProduct} 
                productsToSelect={productsToSelect}
                setSelectedProduct={setNewProduct}
                saveProductInFridge={addProductInFridge}
                cancelEdit={cancelEdit}
            />

            <hr style={{margin: '15px 0'}}/>

            <Container>
                {productsInFridge.map((product) => 
                    
                        (product.isEdit !== null && !product.isEdit)
                        ?
                        viewRow(product)
                        :
                        editRow(product) 
                    
                )}
            </Container>


        </div>
    )
}

export default Fridge;