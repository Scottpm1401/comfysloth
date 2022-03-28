import React, { Component } from "react";
import { connect } from "react-redux";
import Breadcrumb from "../component/layout/Breadcrumb";
import Footer from "../component/layout/Footer";
import { mapStateToProps } from "../component/redux/selectors";
import { Redirect, Link } from "react-router-dom";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

export class Purchase extends Component {
  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    } else
      return (
        <React.Fragment>
          <Breadcrumb page="Purchase" />
          <section className="purchase container">
            <form className="purchase_center">
              {this.props.purchase.length > 0 ? (
                this.props.purchase.map((bill) => {
                  const {
                    id,
                    status,
                    total_bill,
                    payment_method,
                    date,
                    products,
                  } = bill;
                  const { name, email, phone } = bill.billing_details;
                  const { line1, state, city } = bill.billing_details.address;
                  return (
                    <article className="bill" key={id}>
                      <div className="bill_header">
                        <div className="order_place">
                          <h4 className="text_up">Order placed</h4>
                          <p>{date}</p>
                        </div>
                        <div className="delivery">
                          <h4 className="text_up">Delivery To</h4>
                          <p>{name}</p>
                          <p>{phone}</p>
                          <head>{email}</head>
                          <p className="address">
                            {line1} {state} {city}
                          </p>
                        </div>
                        <div className="bill_content">
                          <h4 className="text_up">Orderid: {id}</h4>
                          <p>
                            Total bills:{" "}
                            <span className="bill_product_total">
                              ${total_bill}
                            </span>
                          </p>
                          <p>
                            Payment method:{" "}
                            <span className="visa">{payment_method}</span>
                          </p>
                          <p className="shipping_status">
                            Status:{" "}
                            <LocalShippingIcon style={{ color: "orange" }} />
                            <span className="shipping_text">
                              {status === "succeeded"
                                ? "Shipping..."
                                : "Waiting..."}
                            </span>
                          </p>
                        </div>
                      </div>
                      {products.map((product) => {
                        const { id, img, title, price, color, quantity } =
                          product;
                        return (
                          <article
                            className="bill_product"
                            key={`${id}${color}`}
                          >
                            <div className="bill_product_details">
                              <img
                                className="bill_product_img"
                                src={img}
                                alt={title}
                              />
                              <div className="bill_product_content">
                                <h2 className="bill_product_title">{title}</h2>
                                <p className="bill_product_color">
                                  Color:{" "}
                                  <span className={`${color} color`}></span>
                                </p>
                                <div className="bill_product_mobile_content">
                                  <p className="bill_product_mobile_price">
                                    ${price}
                                  </p>
                                  <p className="bill_product_mobile_quantity">
                                    X{quantity}
                                  </p>
                                  <p className="bill_product_mobile_total_bill">
                                    Total:{" "}
                                    <span className="bill_product_total">
                                      ${(price * quantity).toFixed(2)}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <p className="bill_product_price">${price}</p>
                            <p className="bill_product_quantity">X{quantity}</p>
                            <p className="bill_product_total_bill">
                              Total:{" "}
                              <span className="bill_product_total">
                                ${(price * quantity).toFixed(2)}
                              </span>
                            </p>
                          </article>
                        );
                      })}
                    </article>
                  );
                })
              ) : (
                <div className="empty container">
                  <h2 className="empty_text">Your bills is empty</h2>
                  <Link className="btn" to="/products">
                    Fill it
                  </Link>
                </div>
              )}
            </form>
          </section>
          <Footer />
        </React.Fragment>
      );
  }
}

export default connect(mapStateToProps)(Purchase);
