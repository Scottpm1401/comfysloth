import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { mapStateToProps } from "../component/redux/selectors";
import {
  removeFromCart,
  addQuantity,
  minusQuantity,
  clearCart,
} from "../component/redux/actions/cart";
import Breadcrumb from "../component/layout/Breadcrumb";
import Footer from "../component/layout/Footer";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import { API } from "../api";
import axiosClient from "../interceptor";

class Cart extends Component {
  handleRemove = async (id, color, prices) => {
    const result = await axiosClient.post(
      API.USERS.REMOVECART(this.props.user.id),
      {
        id,
        color,
        prices,
      }
    );
    this.props.removeFromCart({
      id: id,
      color: color,
      prices: prices,
    });
    console.log(result.message);
  };

  handleQuantity = async (method, id, color, quantity, price) => {
    const product = { id, color, quantity: 1, price };
    let newQuantity = 0;
    if (method) {
      newQuantity = 1;
      this.props.addQuantity(product);
    } else if (quantity !== 1) {
      newQuantity = -1;
      this.props.minusQuantity(product);
    }
    const result = await axiosClient.post(
      API.USERS.UPDATEQUANTITY(this.props.user.id),
      {
        id,
        color,
        quantity: newQuantity,
        price,
      }
    );
    console.log(result.message);
  };

  handleClear = async () => {
    this.props.clearCart();
    const result = await axiosClient.post(
      API.USERS.CLEARCART(this.props.user.id)
    );
    console.log(result.message);
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumb page="cart" />
        {this.props.cart.length > 0 ? (
          <section className="cart container">
            <div className="content_center">
              <div className="cart_content">
                <p className="cart_info">Item</p>
                <p className="cart_info">Price</p>
                <p className="cart_info">Quantity</p>
                <p className="cart_info">Subtotal</p>
                <span className="tempbox"></span>
              </div>
              <hr className="cart_top_hr" />
            </div>
            {this.props.cart.map((product) => {
              const { id, img, title, color, price, quantity } = product;
              return (
                <article className="cart_item" key={`${id}${color}`}>
                  <div className="item">
                    <img className="cart_img" src={img} alt={id} />
                    <div className="item_content">
                      <h3 className="item_title">{title}</h3>
                      <p className="item_color">
                        Color: <span className={`${color} color`}></span>
                      </p>
                      <h3 className="item_price mobile_item_price">${price}</h3>
                    </div>
                  </div>
                  <h3 className="item_price">${price}</h3>
                  <div className="item_counter counter">
                    <button
                      className="quantity_btn"
                      type="button"
                      onClick={() =>
                        this.handleQuantity(false, id, color, quantity, price)
                      }
                    >
                      <RemoveRoundedIcon
                        className="quantity_svg"
                        style={{ color: "#102a42" }}
                      />
                    </button>
                    <h2 className="item_quantity">{quantity}</h2>
                    <button
                      className="quantity_btn"
                      type="button"
                      onClick={() =>
                        this.handleQuantity(true, id, color, quantity, price)
                      }
                    >
                      <AddRoundedIcon
                        className="quantity_svg"
                        style={{ color: "#102a42" }}
                      />
                    </button>
                  </div>
                  <h3 className="item_subtotal">
                    ${(price * quantity).toFixed(2)}
                  </h3>
                  <button
                    className="delete_btn"
                    type="button"
                    onClick={() =>
                      this.handleRemove(id, color, price * quantity)
                    }
                  >
                    <DeleteRoundedIcon
                      className="delete_svg"
                      style={{ color: "white", fontSize: "1.25rem" }}
                    />
                  </button>
                </article>
              );
            })}
            <hr />
            <div className="cart_link">
              <Link to="/products" className="btn shopping_btn">
                Continue Shopping
              </Link>
              <button
                type="button"
                className="clear_cart_btn"
                onClick={() => this.handleClear()}
              >
                Clear Shopping Cart
              </button>
            </div>
            <div className="order">
              <article className="order_crl">
                <form className="order_form">
                  <h3 className="order_text">
                    Subtotal:
                    <span>${this.props.user.cart_total.toFixed(2)}</span>
                  </h3>
                  <h3 className="order_text shipping">
                    Shipping Fee:<span>Free</span>
                  </h3>
                  <hr />
                  <h2 className="total">
                    Order Total:{" "}
                    <span>${this.props.user.cart_total.toFixed(2)}</span>
                  </h2>
                </form>
                {this.props.loggedIn ? (
                  <Link to="/checkout" className="btn cart_login">
                    checkout
                  </Link>
                ) : (
                  <Link to="/login" className="btn cart_login">
                    login
                  </Link>
                )}
              </article>
            </div>
          </section>
        ) : (
          <div className="empty container">
            <h2 className="empty_text">Your cart is empty</h2>
            <Link className="btn empty_btn" to="/products">
              fill it
            </Link>
          </div>
        )}
        <Footer />
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, {
  removeFromCart,
  addQuantity,
  minusQuantity,
  clearCart,
})(Cart);
