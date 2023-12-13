import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Provider } from "react-redux";
import "./index.css";

import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "./Redux/image/imageSlice";

const store = configureStore({
  reducer: {
    input: imageSlice,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
