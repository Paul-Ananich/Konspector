import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {FirstScreenReducer} from "./reducers/FirstScreenReducer";

let reducers = combineReducers({
    app: FirstScreenReducer,
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store

window.store = store;