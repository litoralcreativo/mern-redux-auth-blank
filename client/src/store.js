import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers';

const initialState = {};

const middelWare = [thunk];

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middelWare),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

// const store = process.env.NODE_ENV === 'production'?createStore(rootReducer, initialState, compose(
//     applyMiddleware(...middelWare),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )):createStore(rootReducer, initialState, compose(
//     applyMiddleware(...middelWare),
// ));

export default store;