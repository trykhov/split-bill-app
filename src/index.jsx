import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import EditUser from "./components/EditUser";
import TitlePage from "./components/TitlePage";
import TotalBill from "./components/TotalBill";

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    {/* Use HashRouter basename="/" for it to run sucessfully on Github Pages */}
    <HashRouter basename="/"> 
      <Route path="/" component={TitlePage} exact />
      <Route path="/billInfo" component={TotalBill} />
      <Route path="/modifyBill" component={EditUser} />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
