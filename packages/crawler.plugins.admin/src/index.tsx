import React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./libs/store";
import routes from "./libs/routers";
import "./common/schemaform";

ReactDOM.render(<Provider store={store} children={routes}></Provider>,
    document.getElementById("root"),
    () => {
        console.log("React app started!");
    });
