import React from "react";
import { IListItem } from "../model/index";


export const GridTest = (props: IListItem) => {
    return (<div>this is Grid test components v{props.id}.</div>)
}