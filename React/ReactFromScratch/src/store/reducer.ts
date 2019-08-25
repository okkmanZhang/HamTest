import { countReducer } from "../reducers/countReducer";
import { personsReducer } from "../reducers/personsReducer";

export const reducer = {
    count: countReducer,
    persons: personsReducer,
}