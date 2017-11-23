import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./libs/store";
import routes from "./libs/router";
import "./common/schema.form";

ReactDOM.render(
    <Provider store={store} children={routes}></Provider> as JSX.Element,
    document.getElementById("root"),
    () => {
        // console.clear();
    });
