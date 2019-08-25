import { IStoreState, IPerson } from "../models";

export const initialState = { 
    count: 0,
    persons: [] as IPerson[],
} as IStoreState;
