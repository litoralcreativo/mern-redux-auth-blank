import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middelWare = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  process.env.NODE_ENV !== "production"
    ? compose(
        applyMiddleware(...middelWare),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    : compose(applyMiddleware(...middelWare))
);

export default store;
