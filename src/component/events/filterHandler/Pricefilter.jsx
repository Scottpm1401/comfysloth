import React, { Component } from "react";
import { connect } from "react-redux";
import { priceFilter } from "../../redux/actions/filter";
import { mapStateToProps } from "../../redux/selectors";

export class Pricefilter extends Component {
  handlePrice = (e) => {
    this.props.priceFilter(e.target.value);
  };
  render() {
    return (
      <form className="form_crl">
        <h3 className="filter_title">Price</h3>
        <div className="price_filter">
          <p className="price">${this.props.filter.price}</p>
          <input
            className="price_range"
            type="range"
            min="0"
            max="3499.99"
            onChange={(e) => this.handlePrice(e)}
            value={this.props.filter.price}
          />
        </div>
      </form>
    );
  }
}

export default connect(mapStateToProps, { priceFilter })(Pricefilter);
