import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./views/Home";
import Auth from "./views/Auth";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" component={Home} exact></Route>
          <Route path="/auth" component={Auth}></Route>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
