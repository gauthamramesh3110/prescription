import React, { Component } from "react";

export class Sidenav extends Component {
  headerStyle = {
    marginTop: "30px",
  };

  usernameStyle = {
    fontWeight: "bold",
    fontSize: "20px",
  };

  handleClick = (prescriptionId) => {
    this.props.setCurrentPrescription(prescriptionId);
  };

  render() {
    return (
      <ul className="sidenav" id="sidenav-drawer">
        <div className="container" style={this.headerStyle}>
          <div className="row center-align">
            <span style={this.usernameStyle}>Username</span>
          </div>
          <div className="row center-align">
            <button className="btn red waves-effect">
              <span>Logout</span>
              <i className="material-icons left">exit_to_app</i>
            </button>
          </div>
        </div>
        {this.props.prescriptions.map((prescription) => {
          return (
            <li key={prescription.id}>
              <a
                onClick={this.handleClick.bind(this, prescription.id)}
                className="waves-effect"
              >
                {prescription.name}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Sidenav;
