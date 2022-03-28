import React, { Component } from "react";
import { connect } from "react-redux";
import { searchFilter } from "../../redux/actions/filter";
import { mapStateToProps } from "../../redux/selectors";

export class Searchbar extends Component {
  handleSearch = (e) => {
    this.props.searchFilter(e.target.value);
  };
  render() {
    return (
      <form className="form_crl">
        <input
          className="searchbar"
          type="text"
          placeholder="Search"
          onKeyUp={(e) => this.handleSearch(e)}
          name="search"
        />
      </form>
    );
  }
}

export default connect(mapStateToProps, { searchFilter })(Searchbar);
