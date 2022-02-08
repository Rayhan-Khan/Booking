import { createStore,applyMiddleware } from "redux";
import rootReducer from "../Reducer";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(rootReducer,composedEnhancer);


export default store;