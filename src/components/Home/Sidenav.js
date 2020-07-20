import React, { Component } from "react";
import M from "materialize-css";

import firebaseFunctions from "../../firebase";

export class Sidenav extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  headerStyle = {
    marginTop: "30px",
  };

  usernameStyle = {
    fontWeight: "bold",
    fontSize: "20px",
  };

  emailStyle = {
    fontWeight: "lighter",
    fontSize: "12px",
  };

  handleClick = (prescriptionId) => {
    this.props.setCurrentPrescription(prescriptionId);
  };

  render() {
    let { userDetails } = this.props;
    return (
      <ul className="sidenav" id="sidenav-drawer">
        <div className="container" style={this.headerStyle}>
          <div className="row center-align" style={{marginBottom:'0px'}}>
            <span style={this.usernameStyle}>
              {userDetails != null ? userDetails.name : "Username"}
            </span>
          </div>

          <div className="row center-align" style={{marginTop:'0px'}}>
            <span style={this.emailStyle}>
              {userDetails != null ? userDetails.email : "Email"}
            </span>
          </div>

          <div className="row center-align">
            <button
              className="btn red waves-effect sidenav-close"
              onClick={firebaseFunctions.logout}
            >
              <span>Logout</span>
              <i className="material-icons left">exit_to_app</i>
            </button>
          </div>
        </div>
        {this.props.prescriptions != null ? (
          this.props.prescriptions.map((prescription) => {
            return (
              <li key={prescription.id} className="row">
                <a
                  href="#!"
                  onClick={this.handleClick.bind(this, prescription.id)}
                  className="waves-effect sidenav-close"
                >
                  {prescription.name}
                </a>
              </li>
            );
          })
        ) : (
          <li></li>
        )}
        <div className="container center-align">
          <div className="row">
            <div className="col s12">
              <button
                className="btn btn-flat waves-effect waves-dark modal-trigger"
                href="#add-prescription-modal"
              >
                <i className="material-icons left">add</i>
                <span>Add Prescription</span>
              </button>
            </div>
          </div>
        </div>
      </ul>
    );
  }
}

export default Sidenav;
