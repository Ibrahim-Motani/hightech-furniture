import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { DataContextProvider } from "./store/data-context";


ReactDOM.render(
  <DataContextProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </DataContextProvider>,
  document.getElementById("root")
);
