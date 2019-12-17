import React, { Component } from "react";
import fire from "../config/fire";

class LoginSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fireErrors: "",
      formTitle: "Login",
      loginBtn: true
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        this.setState({ fireErrors: error.message });
      });
  };

  signup = e => {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch(error => {
        this.setState({ fireErrors: error.message });
      });
  };

  getAction = action => {
    if (action === "signup") {
      this.setState({
        formTitle: "SignUp",
        loginBtn: false,
        fireErrors: ""
      });
    } else {
      this.setState({
        formTitle: "Login",
        loginBtn: true,
        fireErrors: ""
      });
    }
  };

  render() {
    let errorNotification = this.state.fireErrors ? (
      <div>{this.state.fireErrors}</div>
    ) : null;

    let submitBtn = this.state.loginBtn ? (
      <input type="submit" onClick={this.login} value="Login"></input>
    ) : (
      <input type="submit" onClick={this.signup} value="SignUp"></input>
    );

    let login_signup = this.state.loginBtn ? (
      <button onClick={() => this.getAction("signup")}>SignUp</button>
    ) : (
      <button onClick={() => this.getAction("login")}>Login</button>
    );

    return (
      <div className="form_block">
        <div id="title">{this.state.formTitle}</div>
        <div className="body">
          {errorNotification}
          <form>
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
            />
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
            />
            {submitBtn}
          </form>
          {login_signup}
        </div>
      </div>
    );
  }
}

export default LoginSignup;
