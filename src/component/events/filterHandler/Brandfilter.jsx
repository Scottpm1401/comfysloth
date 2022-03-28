import React, { Component } from "react";
import { connect } from "react-redux";
import { brandFilter } from "../../redux/actions/filter";
import { mapStateToProps } from "../../redux/selectors";

class Brandfilter extends Component {
  handleCompany = (e) => {
    this.props.brandFilter(e.target.value);
  };
  render() {
    return (
      <form className="form_crl">
        <h3 className="filter_title">Company</h3>
        <select
          className="company"
          onChange={(e) => this.handleCompany(e)}
          value={this.props.filter.brand}
        >
          <option value="all">All</option>
          <option value="marcos">Marcos</option>
          <option value="liddy">Liddy</option>
          <option value="ikea">Ikea</option>
          <option value="caressa">Caressa</option>
        </select>
      </form>
    );
  }
}

export default connect(mapStateToProps, { brandFilter })(Brandfilter);
