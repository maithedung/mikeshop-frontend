import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from "react-redux";
import store from "./Redux/store";
import {Widget} from "./widget/Widget";

ReactDOM.render(<Provider store={store}>
    <App/>
    {/*<Widget/>*/}
</Provider>, document.getElementById("root"));
