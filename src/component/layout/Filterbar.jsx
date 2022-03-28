import React, { Component } from "react";
import Searchbar from "../events/filterHandler/Searchbar";
import Categoryfilter from "../events/filterHandler/Categoryfilter";
import Brandfilter from "../events/filterHandler/Brandfilter";
import Colorfilter from "../events/filterHandler/Colorfilter";
import Pricefilter from "../events/filterHandler/Pricefilter";
import Freeshipfilter from "../events/filterHandler/Freeshipfilter";
import Clearfilter from "../events/filterHandler/Clearfilter";

class Filterbar extends Component {
  state = {
    filter: false,
  };

  handleFilter = () => {
    this.setState({ filter: !this.state.filter });
  };

  render() {
    return (
      <section className="filter_crl">
        <div className="filter">
          <Searchbar />
          <div
            className={`more_filter ${
              this.state.filter ? "more_filter_active" : null
            }`}
          >
            <button
              className="btn"
              type="button"
              onClick={() => this.handleFilter()}
            >
              More Filter
            </button>
            <button
              className={`apply_btn ${
                this.state.filter ? "apply_active" : null
              }`}
              onClick={() => this.handleFilter()}
            >
              Done
            </button>
          </div>
          <div
            className={`filter_details ${
              this.state.filter ? "filter_active" : null
            }`}
          >
            <Categoryfilter />
            <Brandfilter />
            <Colorfilter />
            <Pricefilter />
            <Freeshipfilter />
            <Clearfilter />
          </div>
        </div>
      </section>
    );
  }
}

export default Filterbar;
