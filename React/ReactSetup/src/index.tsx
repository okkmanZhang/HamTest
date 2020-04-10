import React from "react";
import ReactDom from "react-dom";
import { GridTest } from './components/GridTest';
import './styles/index.scss';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './containers/App';


ReactDom.render(<App />, document.getElementById("app"));