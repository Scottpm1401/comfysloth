import React, { Component } from "react";
import Breadcrumb from "../component/layout/Breadcrumb";
import Footer from "../component/layout/Footer";
import Productslist from "../component/layout/Productslist";
import Layoutbtn from "../component/events/filterHandler/Layoutbtn";
import Filterbar from "../component/layout/Filterbar";
import Sortfilter from "../component/events/filterHandler/Sortfilter";
import { connect } from "react-redux";
import { mapStateToProps } from "../component/redux/selectors";

class Products extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb page="Products" />
        <section className="products container">
          <Filterbar />
          <section className="products_crl">
            <div className="products_filter">
              <Layoutbtn />
              <p className="products_count">
                {this.props.data.length} Products Found
              </p>
              <hr />
              <Sortfilter />
            </div>
            <Productslist />
          </section>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps)(Products);
