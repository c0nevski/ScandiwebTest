import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { GraphqlClientContext, opusClient } from "./graphQL/graphql-context"; 
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App";
import store from './redux/store'; 

ReactDOM.render(
  <React.StrictMode>
    <GraphqlClientContext.Provider value={opusClient}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
    </GraphqlClientContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
