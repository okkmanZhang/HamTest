export interface IPerson{
    personId?: number;
    name?: string;
}

export interface IStoreState {
    count?: number;
    persons?: IPerson[];
}