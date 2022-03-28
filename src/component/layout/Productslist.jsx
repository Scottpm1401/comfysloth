import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getData, filterData } from "../redux/actions/data";
import { mapStateToProps } from "../redux/selectors";
import store from "../redux/store/store";
import Loading from "./Loading";

store.dispatch(getData);

class Productslist extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.props.filterData(this.props.filter);
    }
  }
  render() {
    return this.props.maindata.length > 0 ? (
      this.props.data.length > 0 ? (
        <div className={`products_list_${this.props.layout}`}>
          {this.props.data.map((product) => {
            const { id, img, title, price, description } = product;
            return (
              <article className={`product_${this.props.layout}`} key={id}>
                <div className="img_crl">
                  <img
                    className={`product_img_${this.props.layout}`}
                    src={img}
                    alt={title}
                  />
                  <Link className="product_link" to={`/products/${id}`}>
                    <svg
                      className="product_link_svg"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                    </svg>
                  </Link>
                </div>
                <div className={`product_content_${this.props.layout}`}>
                  <h2 className={`product_title_${this.props.layout}`}>
                    {title}
                  </h2>
                  <h2 className={`product_price_${this.props.layout}`}>
                    ${price}
                  </h2>
                  <p className={`product_text_${this.props.layout}`}>
                    {description.slice(0, 150)}...
                  </p>
                  <Link
                    to={`products/${id}`}
                    className={`btn product_button_${this.props.layout}`}
                  >
                    Details
                  </Link>
                </div>
                <div className={`mobile_product_btn_${this.props.layout}`}>
                  <Link to={`products/${id}`} className="btn">
                    Details
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <h3 className="not_found">No product found</h3>
      )
    ) : (
      <Loading />
    );
  }
}

export default connect(mapStateToProps, { getData, filterData })(Productslist);
