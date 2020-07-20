import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" data-target="sidenav-drawer" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <a
            className="btn-floating btn-large halfway-fab waves-effect waves-light modal-trigger"
            href="add-medicine-modal"
          >
            <i className="material-icons">add</i>
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
