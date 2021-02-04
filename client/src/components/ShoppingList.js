import React, { useEffect } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';

function ShoppingList (props) {
    const items = props.item;
    useEffect(() => { props.getItems()}, [])

    const removeItem = itemId => {
        props.deleteItem(itemId)
    }

    return (
        <div>
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.items.map(({_id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => {
                                            removeItem(_id);
                                        }}
                                    >&times;</Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}                        
                    </TransitionGroup>
                </ListGroup>
            </Container>
        </div>
    )
}

const mapStateToProps = state => ({
    item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
