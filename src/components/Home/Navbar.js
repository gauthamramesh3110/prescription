import React, { Component } from "react";

export class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" data-target="sidenav-drawer" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
