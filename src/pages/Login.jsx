import React, { Component } from "react";
import Breadcrumb from "../component/layout/Breadcrumb";
import Footer from "../component/layout/Footer";
import { Link, Redirect } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { connect } from "react-redux";
import { mapStateToProps } from "../component/redux/selectors";
import { getUser } from "../component/redux/actions/user";
import axiosClient from "../interceptor";
import { API } from "../api";

export class Login extends Component {
  state = {
    passwordType: true,
    username: "",
    password: "",
    err: "",
  };

  handlePassword = () => {
    this.setState({ passwordType: !this.state.passwordType });
  };

  handleInput = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleLogin = async () => {
    const { username, password } = this.state;
    if (username && password) {
      const result = await axiosClient.post(API.USERS.LOGIN, null, {
        params: {
          username,
          password,
        },
      });
      if (result.data !== null) {
        localStorage.setItem("access_token", result.data.access_token);
        const userDetailsResults = await axiosClient.put(
          API.USERS.AUTHENTICATE
        );
        this.props.getUser(userDetailsResults.data);
      } else {
        this.setState({ err: "Incorrect username or password" });
      }
    } else this.setState({ err: "Please enter all information" });
  };

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/" />;
    } else
      return (
        <React.Fragment>
          <Breadcrumb page="login" />
          <section className="login_center">
            <form
              className="login_form"
              onKeyUp={(e) => e.key === "Enter" && this.handleLogin()}
            >
              <label className="login_text" htmlFor="login_field">
                Username or email address
              </label>
              <input
                id="username"
                className="login_input"
                type="text"
                name="login_field"
                onChange={(e) => this.handleInput(e)}
              />

              <label className="login_text" htmlFor="password_field">
                Password
              </label>
              <div className="password_crl">
                <input
                  id="password"
                  className="password_input"
                  type={this.state.passwordType ? "password" : "text"}
                  name="password_field"
                  onChange={(e) => this.handleInput(e)}
                />
                <button
                  className="show_btn"
                  type="button"
                  onClick={() => this.handlePassword()}
                >
                  {this.state.passwordType ? (
                    <VisibilityOffIcon style={{ color: "#9eb2c7" }} />
                  ) : (
                    <VisibilityIcon style={{ color: "#9eb2c7" }} />
                  )}
                </button>
              </div>
              <button
                className="btn signin_btn"
                type="button"
                onClick={() => this.handleLogin()}
              >
                Sign in
              </button>
              <Link className="forgot" to="/password_reset">
                Forgot password?
              </Link>
              <h2 className="error">{this.state.err}</h2>
            </form>
            <form className="create_account">
              <h2 className="create_account_text">Don't have an account?</h2>
              <Link className="btn create_account_btn" to="/signup">
                Sign up
              </Link>
            </form>
          </section>
          <Footer />
        </React.Fragment>
      );
  }
}

export default connect(mapStateToProps, { getUser })(Login);
