import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { mapStateToProps } from "../redux/selectors";
import { logoutUser } from "../redux/actions/user";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PersonIcon from "@material-ui/icons/Person";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import CloseIcon from "@material-ui/icons/Close";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import axiosClient from "../../interceptor";
import { API } from "../../api";

class Navbar extends Component {
  state = {
    dropdown: false,
    sidebar: false,
  };

  handleDropdown = () => {
    this.setState({ dropdown: !this.state.dropdown });
  };

  collapseDropdown = () => {
    this.setState({ dropdown: false });
  };

  handleModal = () => {
    this.setState({ sidebar: !this.state.sidebar });
  };

  handleLogout = async () => {
    const result = await axiosClient.post(API.USERS.LOGOUT);
    if (result.data.loggedIn === false) {
      localStorage.removeItem("access_token");
      this.props.logoutUser();
    }
    this.setState({ dropdown: false });
  };

  render() {
    return (
      <React.Fragment>
        <div className={`modal ${this.state.sidebar ? "modal_active" : null}`}>
          <aside
            className={`sidebar ${
              this.state.sidebar ? "sidebar_active" : null
            }`}
          >
            <form className="sidebar_form">
              <div className="sidebar_header">
                <img
                  className="logo"
                  src="https://react-course-comfy-sloth-store.netlify.app/static/media/logo.221f6b13.svg"
                  alt="logo"
                />
                <button
                  className="sidebar_close_btn"
                  type="button"
                  onClick={() => this.handleModal()}
                >
                  <CloseIcon
                    style={{
                      color: "red",
                      width: "1.85rem",
                      height: "1.85rem",
                    }}
                  />
                </button>
              </div>
              <div className="sidebar_links">
                <Link
                  className="sidebar_link"
                  to="/"
                  onClick={() => this.handleModal()}
                >
                  Home
                </Link>
                <Link
                  className="sidebar_link"
                  to="/about"
                  onClick={() => this.handleModal()}
                >
                  About
                </Link>
                <Link
                  className="sidebar_link"
                  to="/products"
                  onClick={() => this.handleModal()}
                >
                  Products
                </Link>
                <Link
                  className={`sidebar_link ${
                    !this.props.loggedIn ? "checkout_link" : null
                  }`}
                  to="/checkout"
                  onClick={() => this.handleModal()}
                >
                  Checkout
                </Link>
              </div>
            </form>
          </aside>
        </div>
        <nav className="navbar">
          <div className="nav_center container">
            <div className="nav_sidebar">
              <button
                className="menu_btn"
                type="button"
                onClick={() => this.handleModal()}
              >
                <MenuRoundedIcon
                  style={{ fontSize: "1.85rem", color: "#ab7a5f" }}
                />
              </button>
              <Link to="/" className="nav_logo">
                <img
                  className="logo"
                  src="https://react-course-comfy-sloth-store.netlify.app/static/media/logo.221f6b13.svg"
                  alt="logo"
                />
              </Link>
            </div>

            <div className="nav_links">
              <Link className="link" to="/">
                Home
              </Link>
              <Link className="link" to="/about">
                About
              </Link>
              <Link className="link" to="/products">
                Products
              </Link>
              <Link
                className={`link ${
                  !this.props.loggedIn ? "checkout_link" : null
                }`}
                to="/checkout"
              >
                Checkout
              </Link>
            </div>
            <div className={this.props.loggedIn ? "user_in" : "user_out"}>
              <Link className="user_btn user_cart" to="/cart">
                <span className="user_icon">
                  <ShoppingCartIcon
                    style={{
                      color: "#102a42",
                      height: "1.5em",
                      width: "1.5em",
                    }}
                  />
                </span>
                <span className="cart_quantity">{this.props.cart.length}</span>
              </Link>
              {this.props.loggedIn ? (
                <div className="profile">
                  <button
                    type="button"
                    className="user_btn dropdown_btn"
                    to="/profile"
                    onClick={() => this.handleDropdown()}
                    onBlur={() => this.collapseDropdown()}
                  >
                    {this.props.user.name}
                    <span className="user_avatar_crl">
                      <img
                        className="user_avatar"
                        src={this.props.user.img}
                        alt="user_avatar"
                      />
                    </span>
                  </button>
                  <div
                    className={`dropdown_menu ${
                      this.state.dropdown ? "dropdown_active" : null
                    }`}
                    tabIndex="1"
                  >
                    <Link
                      className="profile_btn"
                      to="/profile"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => this.collapseDropdown()}
                    >
                      Profile
                      <PersonIcon
                        style={{ width: "1.85rem", height: "1.85rem" }}
                      />
                    </Link>
                    <Link
                      to="/purchase"
                      className="purchase_btn"
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => this.collapseDropdown()}
                    >
                      Purchase
                      <ShoppingBasketIcon
                        style={{ width: "1.85rem", height: "1.85rem" }}
                      />
                    </Link>
                    <button
                      className="logout_btn"
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => this.handleLogout()}
                    >
                      Log out
                      <svg
                        className="logout_svg"
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 640 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M624 208H432c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h192c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="user_crl">
                  <Link className="user_btn signin" to="/login">
                    Sign in
                  </Link>
                  <Link className="user_btn signup" to="/signup">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, { logoutUser })(Navbar);
