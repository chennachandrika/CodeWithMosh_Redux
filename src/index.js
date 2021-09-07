import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/configureStore";

const configureStore = store();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={configureStore}>
      <App />
    </Provider>
  </StrictMode>,
  rootElement
);
