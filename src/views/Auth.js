import React, { Component } from "react";
import M from "materialize-css";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";

import firebaseFunctions from "../firebase";

export class Auth extends Component {
  componentDidMount() {
    M.AutoInit();
    firebaseFunctions.onAuthStateChanged(this.props.history);
  }

  tabStyle = {
    marginBottom: "30px",
    borderRadius: "30px 30px 0px 0px",
  };

  loginActionStyle = {
    marginTop: "50px",
    paddingBottom: "10px",
    borderRadius: "30px",
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col s6 offset-s3">
              <div className="card " style={this.loginActionStyle}>
                <ul
                  className="tabs tabs-fixed-width"
                  id="auth-actions"
                  style={this.tabStyle}
                >
                  <li className="tab s6">
                    <a href="#login" className="active">
                      Login
                    </a>
                  </li>
                  <li className="tab s6">
                    <a href="#signup">Sign Up</a>
                  </li>
                </ul>
                <div id="login">
                  <Login></Login>
                </div>
                <div id="signup">
                  <SignUp></SignUp>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
