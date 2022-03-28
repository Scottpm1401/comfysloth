import React, { Component } from "react";
import Breadcrumb from "../component/layout/Breadcrumb";
import Footer from "../component/layout/Footer";

export default class About extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb page="About" />
        <article className="about container">
          <img
            className="about_img"
            src="https://react-course-comfy-sloth-store.netlify.app/static/media/hero-bcg.a876f19f.jpeg"
            alt="about_img"
          />
          <div className="about_content">
            <div className="about_title_crl">
              <h3 className="about_title">Our Story</h3>
              <div className="underline"></div>
            </div>
            <p className="about_text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
              accusantium sapiente tempora sed dolore esse deserunt eaque
              excepturi, delectus error accusamus vel eligendi, omnis beatae.
              Quisquam, dicta. Eos quod quisquam esse recusandae vitae neque
              dolore, obcaecati incidunt sequi blanditiis est exercitationem
              molestiae delectus saepe odio eligendi modi porro eaque in libero
              minus unde sapiente consectetur architecto. Ullam rerum, nemo iste
              ex, eaque perspiciatis nisi, eum totam velit saepe sed quos
              similique amet. Ex, voluptate accusamus nesciunt totam vitae esse
              iste.
            </p>
          </div>
        </article>
        <Footer />
      </React.Fragment>
    );
  }
}
