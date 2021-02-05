import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers';

const initialState = {};

const middelWare = [thunk];

// const store = createStore(rootReducer, initialState, compose(
//     applyMiddleware(...middelWare),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// ))

if(process.env.NODE_ENV === 'production') {
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middleware)
    ));
} else {
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));
}

export default store;