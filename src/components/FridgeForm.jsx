import React from "react";
import Button from 'react-bootstrap/Button';
import {Form} from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from 'react-select'
import { useState } from 'react';

const FridgeForm = ({visible, selectedProduct, productsToSelect, setSelectedProduct, saveProductInFridge, cancelEdit}) => {

    const [validated, setValidated] = useState(false);

    const submitData = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        //validation
        if (!form.checkValidity()){
            event.stopPropagation();
            setValidated(true);
            return;
        }

        saveProductInFridge();
        setValidated(false);
    }

    const cancelData = () => {
        console.log("Cancel data");
        setValidated(false);
        cancelEdit();
    }

    return (
        <Form noValidate validated={validated}
            onSubmit={submitData}
            className='product' style={{display: (visible)?'' :'none'}}> 
            <Row>
                <Form.Group as={Col} md="6">
                    <Form.Label>Product</Form.Label>
                    <Select 
                        className="me-auto"
                        options={productsToSelect}
                        name="Products"
                        placeholder="Select product..."
                        getOptionValue={(option) => `${option['id']}`}
                        getOptionLabel={(option) => `${option['name']}`}
                        //defaultValue={(selectedProduct.productId === 0)? null : {id: selectedProduct.productId, name: selectedProduct.name}}
                        value={(selectedProduct.productId === 0)? null : {id: selectedProduct.productId, name: selectedProduct.name}}
                        onChange={(value) => 
                            setSelectedProduct({...selectedProduct, productId: value.id, name: value.name})
                        } 
                    />
                    <Form.Control type="text" defaultValue={selectedProduct.name} required style={{display: 'none'}}/>
                    <Form.Control.Feedback type="invalid">
                        Please select a product.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" name="Quantity" min={0} value={selectedProduct.quantity}
                        onChange={(e) => setSelectedProduct({...selectedProduct, quantity: e.target.value})}
                    />
                </Form.Group>
                <Form.Group as={Col} md="3" style={{placeSelf: 'center'}}>
                    <Button type="submit" >Save</Button>
                    <div className="vr" />
                    <Button variant="secondary" onClick={cancelData}>Cancel</Button>
                </Form.Group>
            </Row>      
        </Form>
    )
}

export default FridgeForm;