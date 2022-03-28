import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../../redux/selectors";
import { categoryFilter } from "../../redux/actions/filter";

class Categoryfilter extends Component {
  handleCategory = (category) => {
    this.props.categoryFilter(category);
  };
  render() {
    return (
      <form className="form_crl">
        <h3 className="filter_title">Category</h3>
        <div className="category_filter">
          <button
            type="button"
            className={`category_btn ${
              this.props.filter.category === "all" ? "active" : null
            }`}
            onClick={() => this.handleCategory("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`category_btn ${
              this.props.filter.category === "office" ? "active" : null
            }`}
            onClick={() => this.handleCategory("office")}
          >
            Office
          </button>
          <button
            type="button"
            className={`category_btn ${
              this.props.filter.category === "livingroom" ? "active" : null
            }`}
            onClick={() => this.handleCategory("livingroom")}
          >
            Living Room
          </button>
          <button
            type="button"
            className={`category_btn ${
              this.props.filter.category === "kitchen" ? "active" : null
            }`}
            onClick={() => this.handleCategory("kitchen")}
          >
            Kitchen
          </button>
          <button
            type="button"
            className={`category_btn ${
              this.props.filter.category === "bedroom" ? "active" : null
            }`}
            onClick={() => this.handleCategory("bedroom")}
          >
            Bedroom
          </button>
          <button
            type="button"
            className={`category_btn ${
              this.props.filter.category === "dining" ? "active" : null
            }`}
            onClick={() => this.handleCategory("dining")}
          >
            Dining
          </button>
          <button
            type="button"
            className={`category_btn ${
              this.props.filter.category === "kids" ? "active" : null
            }`}
            onClick={() => this.handleCategory("kids")}
          >
            Kids
          </button>
        </div>
      </form>
    );
  }
}
export default connect(mapStateToProps, { categoryFilter })(Categoryfilter);
