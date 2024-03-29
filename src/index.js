import React from "react";
import ReactDOM from "react-dom";

import App from "./app";
import "./assets/styles/index.scss";

import { Provider } from "react-redux";
import stor from "./store";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = stor;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
