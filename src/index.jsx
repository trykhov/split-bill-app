import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import EditUser from "./components/EditUser";
import TitlePage from "./components/TitlePage";
import TotalBill from "./components/TotalBill";

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={TitlePage} exact />
      <Route path="/billInfo" component={TotalBill} />
      <Route path="/modifyBill" component={EditUser} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
