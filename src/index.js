import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Route} from "react-router-dom";
import {ConnectedRouter} from "react-router-redux";
import Application from "./routes/application";
import {store, history} from "./store";
import "./styles/index.scss";

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/" component={Application}/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);