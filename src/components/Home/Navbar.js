import React, { Component } from "react";
import M from "materialize-css";

export class Navbar extends Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <a
              href="#!"
              data-target="sidenav-drawer"
              className="show-on-medium-and-up sidenav-trigger"
            >
              <i className="material-icons">menu</i>
            </a>
            <a
              className="btn-floating btn-large halfway-fab waves-effect waves-light modal-trigger"
              href="#add-medicine-modal"
            >
              <i className="material-icons">add</i>
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
