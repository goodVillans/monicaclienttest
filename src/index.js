import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducers/Reducer"; // Import your root reducer

// Configure the Redux store using configureStore
const store = configureStore({
  reducer: rootReducer, // Pass your root reducer here
});

// Get the root element from the HTML document
const root = document.getElementById("root");
// Create a React root using createRoot
const reactRoot = createRoot(root);

// Render the main App component wrapped in Redux Provider
reactRoot.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
