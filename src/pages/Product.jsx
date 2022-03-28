import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import Breadcrumb from "../component/layout/Breadcrumb";
import Footer from "../component/layout/Footer";
import Addtocart from "../component/events/cart/Addtocart";
import axiosClient from "../interceptor";
import Loading from "../component/layout/Loading";
import { API } from "../api";

class Product extends Component {
  state = {
    product: [],
    main: "",
  };

  componentDidMount = async () => {
    const result = await axiosClient.get(
      API.PRODUCTS.PRODUCT(this.props.match.params.id)
    );
    this.setState({ product: result.data });
    this.setState({ main: result.data.img });
  };

  handleGallery = (img) => {
    this.setState({ main: img });
  };

  render() {
    const {
      id,
      img,
      gallery,
      title,
      stars,
      reviews,
      available,
      sku,
      brand,
      description,
      colors,
      price,
    } = this.state.product;

    return (
      <React.Fragment>
        <Breadcrumb product={true} page={title} />
        {this.state.product.length !== 0 ? (
          <section className="product container">
            <Link to="/products" className="product_btn btn">
              BACK TO PRODUCTS
            </Link>
            <article className="product_details">
              <form className="product_gallery">
                <img className="gallery_main" src={this.state.main} alt="" />
                <div className="gallery">
                  <img
                    className={`gallery_img ${
                      img === this.state.main ? "img_active" : null
                    }`}
                    onClick={() => this.handleGallery(img)}
                    src={img}
                    alt=""
                  />
                  {gallery.map((img) => {
                    return (
                      <img
                        className={`gallery_img ${
                          img === this.state.main ? "img_active" : null
                        }`}
                        onClick={() => this.handleGallery(img)}
                        src={img}
                        key={img}
                        alt=""
                      />
                    );
                  })}
                </div>
              </form>
              <form className="product_content">
                <h2 className="product_title">{title}</h2>
                <div className="product_rating">
                  <StarRatings
                    rating={stars}
                    starRatedColor="orange"
                    numberOfStars={5}
                    starDimension="1.25rem"
                    starSpacing="0.1rem"
                    name="rating"
                  />
                  <h3 className="product_reviews">
                    ({reviews} customers reviews)
                  </h3>
                </div>
                <h3 className="product_price">${price}</h3>
                <p className="product_text">{description}</p>

                <div className="product_info">
                  <h3 className="info_title">Available:</h3>
                  <h3 className="info_text">
                    {available ? "In Stock" : "Out Of Stock"}
                  </h3>
                </div>
                <div className="product_info">
                  <h3 className="info_title">SKU:</h3>
                  <h3 className="info_text">{sku}</h3>
                </div>
                <div className="product_info">
                  <h3 className="info_title">Brand:</h3>
                  <h3 className="info_text">{brand}</h3>
                </div>
                <hr />
                <Addtocart
                  colors={colors}
                  id={id}
                  img={img}
                  price={price}
                  tilte={title}
                />
              </form>
            </article>
          </section>
        ) : (
          <Loading />
        )}
        <Footer />
      </React.Fragment>
    );
  }
}

export default Product;
