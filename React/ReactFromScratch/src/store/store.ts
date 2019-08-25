import {createStore, combineReducers, Middleware, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import logger from "redux-logger";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";

declare const __DEV__: boolean; // from webpack



export interface IStoreState {
    count: number;
}

const initialState = { count: 0} as IStoreState;

function countReducer(state : number  = initialState.count , action : any) {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state -1;
        default:
            return state;
    }
}

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
    combineReducers({count: countReducer}),
    compose(
        applyMiddleware(..._getMiddleware()),
        ));
    

