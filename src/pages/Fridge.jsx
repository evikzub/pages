import React, { useEffect, useState } from "react";
import StorageService from "../API/FridgeService";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyButton from "../components/UI/button/MyButton";
import { Form } from "react-bootstrap";
import StorageForm from "../components/FridgeForm";
import { useParams } from "react-router-dom";


function Storage (){
    const params = useParams();

    const [visible, setVisible] = useState(false);

    const [storages, setStorages] = useState([]);
    const [selectedStorage, setSelectedStorage] = useState({id: 0, name: '', type: ''});
    const [products, setProducts] = useState([]);
    const [productsInStorage, setPoductsInStorage] = useState([]);
    const [productsToSelect, setProductsToSelect] = useState([]);

    const emptyProductInStorage = {storageId: 0, productId: 0, name: '', quantity: 0, isEdit: false};
    const [storedID, setStoredID] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(emptyProductInStorage);
    const [newProduct, setNewProduct] = useState(emptyProductInStorage);

    //Init data
    useEffect (() => {
        //get list of Storages
        setStorages(StorageService.getStorages);
        //get list of Products
        setProducts(StorageService.getProducts);
    }, [])

    //Storages loaded
    useEffect (() => {
        //set storage
        if (params.type){
            //console.log("Params: ", params)
            const storage = storages.filter(st => st.type === params.type)
            //console.log("Storage: ", storage[0])
            setSelectedStorage(storage[0])
        }
    }, [storages])

    //Storage selected
    useEffect (() => {
        if (selectedStorage === undefined || selectedStorage.id === 0){
            return;
        }

        //console.log("useEffect for selectedStorage: ", selectedStorage)
        //get list of products in storage
        const storageProducts = StorageService.getProductsByStorageId(selectedStorage.id);
        setPoductsInStorage(storageProducts);
    }, [selectedStorage])

    //Products in Storage selected 
    useEffect (() => {
        if (productsInStorage.length ===0){
            return;
        }        
        console.log("useEffect for productsInStorage: "); //, productsInStorage)
        //clear products for unique seles
        productsForSelect(productsInStorage);
    }, [productsInStorage]) //?

    // //? For test -> to remove
    // useEffect (() => {
    //     //if (productsInStorage.length ===0){
    //     //    return;
    //     //}        
    //     console.log("useEffect for selectedProduct: ", selectedProduct)
    //     //productsForSelect(productsInStorage);
    // }, [selectedProduct])

    //List of products not in storage
    const productsForSelect = (storageProducts) => {
        const productsForUse =[];
        //Taking all products we have
        products.forEach(product => {
            //checking if product is in Storage
            const lookUp = storageProducts.filter(stProduct => {
                if (stProduct.productId === product.id){
                    return true;
                }
                return false;
            })
            //console.log("Product.ID: ", product.id, " lookUp: ", lookUp)

            //if product not in storage => push it to the list
            if (lookUp.length === 0){
                productsForUse.push(product);
            }
        })
        //console.log(productsForUse);
        //store list for Select
        setProductsToSelect(productsForUse);
    }

    //Select Storage
    const selectStorage = (storage) => {
        //console.log('selectStorage: ', fr);
        setSelectedStorage(storage);
    }

    //Allows open form to add new product
    const enableAdd = () => {
        setVisible(selectedStorage.id!==0);
        setNewProduct(emptyProductInStorage);
    }

    //Indicate product in the list for Edit
    const updateProductsInStorage = (prod, originalId, isEdit) => {
        //Modify if Product is in Edit mode
        const savedProduct = {...prod, isEdit: isEdit}
        console.log("Product for Save: ", savedProduct);
        const newSetOfProducts = productsInStorage.map((prInStorage) => 
            (prInStorage.productId === originalId) ? savedProduct : {...prInStorage, isEdit: false}
            );
        console.log("Products after save: ", newSetOfProducts)
        setPoductsInStorage(newSetOfProducts);
    }

    //Edit finction
    const editProduct = (prod, isEdit) => {
        updateProductsInStorage(prod, prod.productId, isEdit)
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
        updateProductsInStorage(selectedProduct, selectedProduct.productId, false)
        setVisible(selectedProduct.productId === 0)
    }


    //Update product
    const saveProductInStorage = () => {   
        console.log("Save product ->>")
        console.log("Updated Product: ", selectedProduct)
        updateProductsInStorage(selectedProduct, storedID, false)
        //cancelEdit();//?     
        //console.log("selectedStorage: ", selectedStorage)
    }

    //Add product
    const addProductInStorage = () => {
        console.log("Add product ->>")
        const product = {...newProduct, storageId: selectedStorage.id} 
        setNewProduct(product)
        console.log("Insert Product: ", product)
        setPoductsInStorage([...productsInStorage, product])
        setNewProduct(emptyProductInStorage)
        //setVisible(false)
    }

    //Delete product
    const deleteProductInStorage = (prod) => {
        console.log("Delete product ->>")
        setPoductsInStorage(productsInStorage.filter(product => product.productId !== prod.productId));

    }

    //View mode for product
    const viewRow = (prInStorage) => {
        return (
            //<>
            <Row className='product' key={prInStorage.productId}>
                <Col md="6">
                    <Form.Label>Product</Form.Label>
                    <div>{prInStorage.name}</div> 
                </Col>
                <Col md="3">
                    <Form.Label>Quantity</Form.Label>
                    <div>{prInStorage.quantity}</div> 
                </Col>
                <Col style={{display:'flex', flexDirection: 'row-reverse'}} md="3">
                    <MyButton onClick={() => deleteProductInStorage(prInStorage)} >Delete</MyButton> 
                    <MyButton onClick={e => editProduct(prInStorage, true)}>Edit</MyButton>
                </Col>
            </Row>
            //</>
        )
    }

    //Edit mode for product
    const editRow = (prInStorage) => {
        //setVisible(false)

        return (
            //<>
            <Row key={prInStorage.productId} >
                <StorageForm
                    visible={true}
                    selectedProduct={selectedProduct} 
                    productsToSelect={productsToSelect}
                    setSelectedProduct={setSelectedProduct}
                    saveProductInStorage={saveProductInStorage}
                    cancelEdit={cancelEdit}
                />
            </Row>
            //</>
        )
    }

    return(
        <div className="App">
            <h1>Storage</h1>
            <ListGroup horizontal>
                {storages.map((st) => 
                    <ListGroup.Item key={st.id} action onClick={() => selectStorage(st)}>{st.name}</ListGroup.Item>
                )}                
            </ListGroup>

            <hr style={{margin: '15px 0'}}/>

            <MyButton style={{width: '150px', margin: '15px 0'}} onClick={() => enableAdd()} >Add Product</MyButton>

            <StorageForm
                visible={visible}
                selectedProduct={newProduct} 
                productsToSelect={productsToSelect}
                setSelectedProduct={setNewProduct}
                saveProductInStorage={addProductInStorage}
                cancelEdit={cancelEdit}
            />

            <hr style={{margin: '15px 0'}}/>

            <Container>
                {productsInStorage.map((product) => 
                    
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

export default Storage;