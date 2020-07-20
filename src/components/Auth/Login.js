import React, { Component } from "react";

import firebaseFunctions from "../../firebase";
import M from "materialize-css";

export class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  textChangeHandler = (event) => {
    let variableName = event.target.id.split("-")[1];
    this.setState({
      [variableName]: event.target.value,
    });
  };

  login = (event) => {
    event.preventDefault();
    let emailEmpty = this.state.email.length === 0;
    let passwordEmpty = this.state.password.length === 0;
    if (emailEmpty) {
      M.toast({ html: "Enter and email" });
    }
    if (passwordEmpty) {
      M.toast({ html: "Enter a password" });
    }

    if (!emailEmpty && !passwordEmpty)
      firebaseFunctions
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch((err) => {
          if (err.code === "auth/user-not-found") {
            M.toast({ html: "Email or Password incorrect" });
          }
        });
  };

  render() {
    return (
      <form id="login" onSubmit={this.login}>
        <div className="row">
          <div className="col s10 offset-s1 input-field">
            <input
              id="login-email"
              type="text"
              onChange={this.textChangeHandler}
            ></input>
            <label htmlFor="login-email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="col s10 offset-s1 input-field">
            <input
              id="login-password"
              type="password"
              onChange={this.textChangeHandler}
            />
            <label htmlFor="login-password">Password</label>
          </div>
        </div>
        <div className="row ">
          <div className="col s12 center-align">
            <button type="submit" className="btn waves-effect waves-light">
              Login
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Login;
