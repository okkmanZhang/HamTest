import {createStore, combineReducers, Middleware, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import logger from "redux-logger";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { reducer } from "./reducer";

declare const __DEV__: boolean; // from webpack

function _getMiddleware(): Middleware[] { 		
	let middleware = [
		promise,
		thunk
	];

	if (__DEV__) {
		middleware = [...middleware, logger, reduxImmutableStateInvariant()]
	}
	 
	return middleware;
}


// export function incrementSuccess() {
//     return {type: INCREMENT};
// }

// export function decrementSuccess() {
//     return {type: DECREMENT};
// }

export default  createStore(
    combineReducers(reducer),
    compose(
        applyMiddleware(..._getMiddleware()),
        ));
    

