import React, { Component } from "react";
import { connect } from "react-redux";
import { colorFilter } from "../../redux/actions/filter";
import { mapStateToProps } from "../../redux/selectors";

export class Colorfilter extends Component {
  handleCompany = (color) => {
    this.props.colorFilter(color);
  };

  render() {
    return (
      <form className="form_crl">
        <h3 className="filter_title">Colors</h3>
        <div className="color_filter">
          <button
            className={`all_btn ${
              this.props.filter.color === "all" ? "active" : null
            }`}
            onClick={() => this.handleCompany("all")}
            type="button"
          >
            All
          </button>
          <button
            className={`clr_btn red ${
              this.props.filter.color === "red" ? "active" : null
            }`}
            onClick={() => this.handleCompany("red")}
            type="button"
          >
            <svg
              className="checked_svg"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
            </svg>
          </button>
          <button
            className={`clr_btn lime ${
              this.props.filter.color === "lime" ? "active" : null
            }`}
            onClick={() => this.handleCompany("lime")}
            type="button"
          >
            <svg
              className="checked_svg"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
            </svg>
          </button>
          <button
            className={`clr_btn blue ${
              this.props.filter.color === "blue" ? "active" : null
            }`}
            onClick={() => this.handleCompany("blue")}
            type="button"
          >
            <svg
              className="checked_svg"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
            </svg>
          </button>
          <button
            className={`clr_btn black ${
              this.props.filter.color === "black" ? "active" : null
            }`}
            onClick={() => this.handleCompany("black")}
            type="button"
          >
            <svg
              className="checked_svg"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
            </svg>
          </button>
          <button
            className={`clr_btn orange ${
              this.props.filter.color === "orange" ? "active" : null
            }`}
            onClick={() => this.handleCompany("orange")}
            type="button"
          >
            <svg
              className="checked_svg"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
            </svg>
          </button>
        </div>
      </form>
    );
  }
}

export default connect(mapStateToProps, { colorFilter })(Colorfilter);
