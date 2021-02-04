import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
  } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions'

function ItemModal (props) {
    const [modal, setModal] = useState(false)
    const [text, setText] = useState('')

    const toggle = () => {
        setModal(!modal);
    }

    const onChange = e => {
        setText(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault();
        const newItem = {
            name: text
        }

        // Add item via addItem action
        props.addItem(newItem);
        toggle();
    }

    return (
        <div>
            <Button
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={toggle}
            >Add Item</Button>
            
            <Modal
                isOpen={modal}
                toggle={toggle}
                >
                <ModalHeader toggle={toggle}>Add to shopping list</ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="item">Item</Label>
                            <Input 
                                type="text"
                                name="name"
                                id="item"
                                placeholder="Add shopping item"
                                onChange={onChange}
                            ></Input>
                            <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                            >Add Item</Button>
                        </FormGroup>
                    </Form>    
                </ModalBody>    
            </Modal>
        </div>
    )
}

const mapStateToProps = state => ({
    item: state.item
});

export default connect(mapStateToProps, { addItem })(ItemModal);
