import { createStore, applyMiddleware } from 'redux';
import { loadState, saveState } from "./localState";
import reduxThunk from 'redux-thunk';
import rootReducer from "./reducers/index"
import throttle from "lodash/throttle";

const localState=loadState();
const store=createStore(rootReducer,localState, applyMiddleware(reduxThunk));


store.subscribe(
    throttle(() => {
        saveState(store.getState());
    }, 1000)
);

export default store;