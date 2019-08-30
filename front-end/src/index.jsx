import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import TitlePage from "./components/TitlePage";
import TotalBill from "./components/TotalBill";
import NumPeople from "./components/NumPeople";

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={TitlePage} exact />
    <Route path="/billInfo" component={TotalBill} />
    <Route path="/numberOfPeople" component={NumPeople} />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
