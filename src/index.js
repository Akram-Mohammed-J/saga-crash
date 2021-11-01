import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootSaga from "./sagas";
import reducers from "./reducers";
import axios from "axios";
import createSagaMiddleWare from "redux-saga";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3005";
const sagaMiddleware = createSagaMiddleWare();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
