import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/root";
import thunk from "redux-thunk";

const initState = {};

const middleWare = [thunk];

const store = createStore(
  rootReducer,
  initState,
  compose(applyMiddleware(...middleWare))
);

export default store;
