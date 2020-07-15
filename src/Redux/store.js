import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {GroupsReducer} from "./reducers/GroupsReducer";

let reducers = combineReducers({
    app: GroupsReducer,
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store

window.store = store;