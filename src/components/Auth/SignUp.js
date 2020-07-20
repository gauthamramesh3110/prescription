import React, { Component } from "react";

import firebaseFunctions from "../../firebase";

export class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    retypePassword: "",
  };

  SignUp = (event) => {
    event.preventDefault();
    console.log("creating user");
    firebaseFunctions.createUserWithEmailAndPassword(
      this.state.email,
      this.state.password
    );
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
              id="signup-retype-password"
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
