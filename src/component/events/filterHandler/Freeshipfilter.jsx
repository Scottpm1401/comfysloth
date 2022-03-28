import React, { Component } from "react";
import { connect } from "react-redux";
import { freeshipFilter } from "../../redux/actions/filter";
import { mapStateToProps } from "../../redux/selectors";

export class Freeshipfilter extends Component {
  handleFreeship = (e) => {
    this.props.freeshipFilter(e.target.checked);
  };
  render() {
    return (
      <form className="form_crl">
        <label className="freeship" htmlFor="shipping">
          Free Shipping
        </label>
        <input
          className="freeship_box"
          type="checkbox"
          onChange={(e) => this.handleFreeship(e)}
          name="shipping"
          checked={this.props.filter.freeship}
        />
      </form>
    );
  }
}

export default connect(mapStateToProps, { freeshipFilter })(Freeshipfilter);
