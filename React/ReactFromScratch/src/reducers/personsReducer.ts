import { initialState } from "../store/initialState";
import { IPerson } from "../models";

export function personsReducer(state : IPerson[]  = initialState.persons , action : any) {
    switch (action.type) {
        case "GET_PERSONS_SUCCESS":            
        case "SET_PERSONS_SUCCESS":
            return action.payload;
        default:
            return state;
    }
}