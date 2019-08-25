import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import "./styles/styles.scss"; 
import App  from "./containers/App";
import store from "./store/store";

const MyApp = () => (
    <Provider store={store}>
         <App  />
    </Provider>
)

ReactDOM.render(
    <MyApp  />,
    document.getElementById("example")
);