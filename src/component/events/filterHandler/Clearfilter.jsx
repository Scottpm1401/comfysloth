import React, { Component } from "react";
import { connect } from "react-redux";
import { clearFilter } from "../../redux/actions/filter";
import { mapStateToProps } from "../../redux/selectors";

export class Clearfilter extends Component {
  handleClear = () => {
    this.props.clearFilter();
  };
  render() {
    return (
      <button
        className="clear_btn"
        type="button"
        onClick={() => this.handleClear()}
      >
        Clear Filter
      </button>
    );
  }
}

export default connect(mapStateToProps, { clearFilter })(Clearfilter);
