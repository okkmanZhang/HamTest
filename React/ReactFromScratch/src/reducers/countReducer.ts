import { initialState } from "../store/initialState";

export function countReducer(state : number  = initialState.count , action : any) {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state -1;
        default:
            return state;
    }
}