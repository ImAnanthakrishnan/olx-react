import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FirebaseContext } from "./store/FirebaseContext";
import { BrowserRouter } from "react-router-dom";
import Context from "./store/FirebaseContext";
import firebase from "./firebase/config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseContext.Provider value={{ firebase }}>
        <Context>
          <App />
        </Context>
      </FirebaseContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
