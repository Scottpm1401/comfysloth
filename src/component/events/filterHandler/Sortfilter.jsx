import React, { Component } from "react";
import { connect } from "react-redux";
import { sortFilter } from "../../redux/actions/filter";
import { mapStateToProps } from "../../redux/selectors";

export class Sortfilter extends Component {
  handleSort = (e) => {
    this.props.sortFilter(e.target.value);
  };
  render() {
    return (
      <form className="sort_form">
        <p className="sortby">Sort By</p>
        <select
          className="sort"
          onChange={(e) => this.handleSort(e)}
          value={this.props.filter.sort}
        >
          <option value="lowest">Price (Lowest)</option>
          <option value="highest">Price (Highest)</option>
          <option value="a">Name (A - Z)</option>
          <option value="z">Name (Z - A)</option>
        </select>
      </form>
    );
  }
}

export default connect(mapStateToProps, { sortFilter })(Sortfilter);
