import React, { Component } from "react";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart, addQuantity } from "../../redux/actions/cart";
import { mapStateToProps } from "../../redux/selectors";
import axiosClient from "../../../interceptor";
import { API } from "../../../api";

export class Addtocart extends Component {
  state = {
    color: "",
    quantity: 1,
  };

  handleCart = async () => {
    const item = {
      id: this.props.id,
      img: this.props.img,
      title: this.props.title,
      price: this.props.price,
      color: this.state.color,
      quantity: this.state.quantity,
    };
    if (
      this.props.cart.findIndex(
        (product) =>
          product.id === this.props.id && product.color === this.state.color
      ) !== -1
    ) {
      this.props.addQuantity({
        id: this.props.id,
        color: this.state.color,
        quantity: this.state.quantity,
        price: this.props.price,
      });
      const result = await axiosClient.post(
        API.USERS.UPDATEQUANTITY(this.props.user.id),
        {
          id: this.props.id,
          color: this.state.color,
          quantity: this.state.quantity,
          price: this.props.price,
        }
      );
      console.log(result.data.message);
    } else {
      const result = await axiosClient.post(
        API.USERS.ADDCART(this.props.user.id),
        item
      );
      console.log(result.message);
      this.props.addToCart(item);
    }
  };

  componentDidMount() {
    this.setState({ color: this.props.colors[0] });
  }

  handleColor = (color) => {
    this.setState({ color: color });
  };

  handleQuantity = (method) => {
    if (method) {
      this.setState({ quantity: this.state.quantity + 1 });
    } else if (this.state.quantity !== 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };

  render() {
    return (
      <div className="addtocart">
        <div className="product_info color_info">
          <h3 className="info_title">Colors:</h3>
          <div className="product_colors">
            {this.props.colors.map((color) => {
              return (
                <button
                  className={`product_clr_btn ${color} ${
                    this.state.color === color ? "color_active" : null
                  }`}
                  type="button"
                  key={color}
                  onClick={() => this.handleColor(color)}
                >
                  <svg
                    className="product_checked_svg"
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
              );
            })}
          </div>
        </div>
        <div className="counter">
          <button
            className="quantity_btn"
            type="button"
            onClick={() => this.handleQuantity(false)}
          >
            <RemoveRoundedIcon style={{ color: "#102a42" }} />
          </button>
          <h2 className="quantity">{this.state.quantity}</h2>
          <button
            className="quantity_btn"
            type="button"
            onClick={() => this.handleQuantity(true)}
          >
            <AddRoundedIcon style={{ color: "#102a42" }} />
          </button>
        </div>
        {this.props.loggedIn ? (
          <Link onClick={() => this.handleCart()} className="btn" to="/cart">
            ADD TO CART
          </Link>
        ) : (
          <Link className="btn" to="/login">
            PLEASE LOGIN TO PROCESS
          </Link>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, { addToCart, addQuantity })(Addtocart);
