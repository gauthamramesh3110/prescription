import React, { Component } from "react";

import firebaseFunctions from "../../firebase";
import M from "materialize-css";

export class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    retypePassword: "",
  };

  SignUp = (event) => {
    event.preventDefault();

    const emailRe = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

    let passwordsMatch = this.state.password === this.state.retypePassword;
    let validateName =
      this.state.name.length > 5 && this.state.name.length < 15;
    let validateEmail = emailRe.test(String(this.state.email).toLowerCase());

    if (!passwordsMatch) {
      M.toast({ html: "Passwords don't match" });
    }
    if (!validateEmail) {
      M.toast({ html: "Please Enter a correct email" });
    }
    if (!validateName) {
      M.toast({ html: "Name should be 5-15 characters long" });
    }

    if (passwordsMatch && validateName && validateEmail)
      firebaseFunctions
        .createUserWithEmailAndPassword(
          this.state.email,
          this.state.password,
          this.state.name
        )
        .catch((err) => {
          M.toast({ html: err.message });
        });
  };

  textChangeHandler = (event) => {
    let variableName = event.target.id.split("-")[1];
    this.setState({
      [variableName]: event.target.value,
    });
  };

  render() {
    return (
      <form id="signup" onSubmit={this.SignUp}>
        <div className="row">
          <div className="col s10 offset-s1 input-field">
            <input
              id="signup-name"
              type="text"
              onChange={this.textChangeHandler}
            ></input>
            <label htmlFor="signup-name">Name</label>
          </div>
        </div>
        <div className="row">
          <div className="col s10 offset-s1 input-field">
            <input
              id="signup-email"
              type="email"
              onChange={this.textChangeHandler}
            ></input>
            <label htmlFor="signup-email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="col s10 offset-s1 input-field">
            <input
              id="signup-password"
              type="password"
              onChange={this.textChangeHandler}
            />
            <label htmlFor="signup-password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="col s10 offset-s1 input-field">
            <input
              id="signup-retypePassword"
              type="password"
              onChange={this.textChangeHandler}
            />
            <label htmlFor="signup-retype-password">Retype Password</label>
          </div>
        </div>
        <div className="row ">
          <div className="col s12 center-align">
            <button type="submit" className="btn waves-effect waves-light">
              Sign Up
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default SignUp;
