import React, { Component } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { connect } from "react-redux";
import { mapStateToProps } from "../redux/selectors";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/actions/cart";
import { addPurchase } from "../redux/actions/purchase";
import axiosClient from "../../interceptor";
import { API } from "../../api";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export class PaymentForm extends Component {
  state = {
    success: false,
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    total: 0,
    pending: false,
  };

  componentDidMount = () => {
    this.setState({
      name: this.props.user.name,
      address: this.props.user.address,
      email: this.props.user.email,
      phone: this.props.user.phone,
      total: Math.round(this.props.user.cart_total),
      city: this.props.user.city,
      state: this.props.user.state,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ pending: true });
    const billingDetails = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: {
        city: this.state.city,
        line1: this.state.address,
        state: this.state.state,
      },
    };
    const { error, paymentMethod } =
      await this.props.stripe.createPaymentMethod({
        type: "card",
        card: this.props.elements.getElement(CardElement),
        billing_details: billingDetails,
      });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axiosClient.post(API.PAYMENT, {
          amount: this.state.total * 100,
          id,
          user_id: this.props.user.id,
          cart: this.props.cart,
          billing_details: billingDetails,
          total: this.state.total,
        });
        if (response.data.success) {
          this.setState({ success: true });
          this.props.clearCart();
          const result = await axiosClient.post(
            API.USERS.CLEARCART(this.props.user.id)
          );
          console.log(result.data.message);
          this.props.addPurchase(response.data.purchaseForm);
          this.setState({ pending: false });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(error.message);
    }
  };

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.success && this.props.user.cart_total !== 0 ? (
          <form className="checkout_form" onSubmit={this.handleSubmit}>
            <div className="checkout_content">
              <label className="checkout_text" htmlFor="checkout_name">
                Name:
              </label>
              <input
                id="checkout_name"
                className="checkout_input"
                type="text"
                value={this.state.name}
                name="name"
                onChange={(e) => this.handleInput(e)}
              />
            </div>
            <div className="checkout_content">
              <label className="checkout_text" htmlFor="checkout_email">
                Email:
              </label>
              <input
                id="checkout_email"
                className="checkout_input"
                type="email"
                value={this.state.email}
                name="email"
                onChange={(e) => this.handleInput(e)}
              />
            </div>
            <div className="checkout_content">
              <label className="checkout_text" htmlFor="checkout_phone">
                Phone:
              </label>
              <input
                id="checkout_phone"
                className="checkout_input"
                type="text"
                value={this.state.phone}
                name="phone"
                onChange={(e) => this.handleInput(e)}
              />
            </div>
            <div className="checkout_content">
              <label className="checkout_text" htmlFor="checkout_address">
                Address:
              </label>
              <input
                id="checkout_address"
                className="checkout_input"
                type="text"
                value={this.state.address}
                name="address"
                onChange={(e) => this.handleInput(e)}
              />
            </div>
            <div className="checkout_content">
              <label className="checkout_text" htmlFor="checkout_city">
                City:
              </label>
              <input
                id="checkout_city"
                className="checkout_input"
                type="text"
                value={this.state.city}
                name="city"
                onChange={(e) => this.handleInput(e)}
              />
            </div>
            <div className="checkout_content">
              <label className="checkout_text" htmlFor="checkout_state">
                State:
              </label>
              <input
                id="checkout_state"
                className="checkout_input"
                type="text"
                value={this.state.state}
                name="state"
                onChange={(e) => this.handleInput(e)}
              />
            </div>
            <div className="checkout_content">
              <h2 className="checkout_total">Total:</h2>
              <p className="checkout_total_price">${this.state.total}</p>
            </div>
            <div className="checkout_content">
              <p className="checkout_text">Test Visa:</p>
              <p className="visa">4242 4242 4242 4242</p>
            </div>
            <fieldset className="FormGroup">
              <div className="FormGrow">
                <CardElement options={CARD_OPTIONS} />
              </div>
            </fieldset>
            <button className="btn">
              {this.state.pending ? "Pending..." : "Pay"}
            </button>
          </form>
        ) : this.state.success ? (
          <div className="payment_success">
            <h2>Your payment is successful</h2>
            <Link className="btn shopping_btn" to="/purchase">
              See your orders
            </Link>
            <Link className="btn shopping_btn" to="/products">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="empty container">
            <h2 className="empty_text">Your cart is empty</h2>
            <Link className="btn empty_btn" to="/products">
              fill it
            </Link>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, { clearCart, addPurchase })(
  PaymentForm
);
