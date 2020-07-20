import React, { Component } from "react";
import M from "materialize-css";

import firebaseFunctions from "../firebase";
import Sidenav from "../components/Home/Sidenav";
import Navbar from "../components/Home/Navbar";

export class Home extends Component {
  componentDidMount() {
    M.AutoInit();
    firebaseFunctions.onAuthStateChanged(this.props.history);
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Sidenav></Sidenav>
      </div>
    );
  }
}

export default Home;
