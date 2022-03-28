import React, { Component } from "react";
import Breadcrumb from "../component/layout/Breadcrumb";
import Footer from "../component/layout/Footer";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Redirect } from "react-router-dom";
import PaymentForm from "../component/layout/PaymentForm";
import { connect } from "react-redux";
import { mapStateToProps } from "../component/redux/selectors";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_API_KEY}`);

class Checkout extends Component {
  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    } else
      return (
        <React.Fragment>
          <Breadcrumb page="Checkout" />
          <div className="checkout container">
            <Elements stripe={stripePromise}>
              <ElementsConsumer>
                {({ elements, stripe }) => (
                  <PaymentForm stripe={stripe} elements={elements} />
                )}
              </ElementsConsumer>
            </Elements>
          </div>
          )
          <Footer />
        </React.Fragment>
      );
  }
}

export default connect(mapStateToProps)(Checkout);
