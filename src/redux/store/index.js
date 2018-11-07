import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "../reducers";

const loggerMiddleware = createLogger();

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware));

export const store = createStore(rootReducer, middleware);