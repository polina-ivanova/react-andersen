import { combineReducers, createStore } from "redux";
import { loginReducer } from "./reducers/loginReducer";
import { todoReducer } from "./reducers/todoReducer";

const rootReducer = combineReducers({ loginReducer, todoReducer });

const store = createStore(rootReducer);

export default store;
