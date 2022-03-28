import React, { Component } from "react";
import Breadcrumb from "../component/layout/Breadcrumb";
import Footer from "../component/layout/Footer";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps } from "../component/redux/selectors";
import { getUser } from "../component/redux/actions/user";
import axiosClient from "../interceptor";
import { API } from "../api";

export class Signup extends Component {
  state = {
    passwordType: true,
    err: "",
    name: "",
    email: "",
    birthday: "",
    password: "",
    confirm: "",
  };

  handleCreate = async (e) => {
    e.preventDefault();
    const { name, email, birthday, password, confirm } = this.state;
    if (name && email && birthday && password && confirm) {
      if (password !== confirm) {
        this.setState({ err: "Password is not confirmed" });
      } else {
        const user = await axiosClient.post(API.USERS.SIGNUP, {
          name,
          email,
          birthday,
          password,
          username: email,
          cart: [],
          purchase: [],
        });
        this.setState({ err: user.data.message });
        if (user.data.loggedIn) {
          setTimeout(async () => {
            const resultLogin = await axiosClient.post(API.USERS.LOGIN, null, {
              params: {
                username: email,
                password,
              },
            });
            if (resultLogin.data !== null) {
              localStorage.setItem(
                "access_token",
                resultLogin.data.access_token
              );
              this.props.getUser(user.data);
            }
          }, 3000);
        }
      }
    } else this.setState({ err: "Please enter all infomation" });
  };

  handleInput = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handlePassword = () => {
    this.setState({ passwordType: !this.state.passwordType });
  };
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/" />;
    } else
      return (
        <React.Fragment>
          <Breadcrumb page="sign up" />
          <section className="signup_center">
            <form
              className="signup_form"
              onSubmit={(e) => this.handleCreate(e)}
            >
              <label className="signup_text" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="signup_input"
                type="text"
                onChange={(e) => this.handleInput(e)}
              />
              <label className="signup_text" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="signup_input"
                type="email"
                onChange={(e) => this.handleInput(e)}
              />
              <label className="signup_text" htmlFor="birthday">
                Birthday
              </label>
              <input
                id="birthday"
                className="signup_input birthday"
                type="date"
                onChange={(e) => this.handleInput(e)}
              />
              <label className="signup_text" htmlFor="password">
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
              <label className="signup_text" htmlFor="confirm_password">
                Confirm Password
              </label>
              <input
                id="confirm"
                className="signup_input"
                type="password"
                onChange={(e) => this.handleInput(e)}
              />
              <p className="signup_term">
                By clicking Create account, I agree that I have read and
                accepted the
                <Link className="term_privacy" to="/terms">
                  {" Terms of Use"}
                </Link>
                {" and "}
                <Link className="term_privacy" to="/terms">
                  Privacy Policy
                </Link>
                .
              </p>
              <button className="btn">Create account</button>
              <h2 className="error">{this.state.err}</h2>
            </form>
          </section>
          <Footer />
        </React.Fragment>
      );
  }
}

export default connect(mapStateToProps, { getUser })(Signup);
