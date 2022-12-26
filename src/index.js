import React, { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/store";
// import {Widget} from "./widget/Widget";

render(
  <StrictMode>
    <Provider store={store}>
      <App />
      {/*<Widget/>*/}
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
