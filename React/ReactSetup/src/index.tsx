import React from "react";
import ReactDom from "react-dom";
import { GridTest } from './components/GridTest';
import './styles/index.css';

ReactDom.render(<GridTest id={5} name={"test"}/>, document.getElementById("app"));