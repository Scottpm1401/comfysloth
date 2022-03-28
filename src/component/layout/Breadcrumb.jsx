import React, { Component } from "react";
import { Link } from "react-router-dom";

class Breadcrumb extends Component {
  render() {
    return (
      <section className="breadcrumb">
        <div className="breadcrumb_center container">
          <Link className="breadcrumb_redirect" to="/">
            Home
          </Link>
          {this.props.product ? (
            <Link className="breadcrumb_redirect" to="/products">
              / Products
            </Link>
          ) : null}
          <h3 className="breadcrumb_page">/ {this.props.page}</h3>
        </div>
      </section>
    );
  }
}

export default Breadcrumb;
