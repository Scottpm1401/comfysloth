import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "../component/redux/selectors";
import { Redirect } from "react-router-dom";
import { updateProfileImg, updateUser } from "../component/redux/actions/user";
import Breadcrumb from "../component/layout/Breadcrumb";
import Footer from "../component/layout/Footer";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import axios from "axios";
import axiosClient from "../interceptor";
import { API } from "../api";

export class Profile extends Component {
  state = {
    name: "",
    birthday: "",
    sex: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    message: "",
    uploading: false,
  };

  componentDidMount() {
    const { name, birthday, sex, email, phone, address, city, state } =
      this.props.user;
    this.setState({
      name,
      birthday,
      sex,
      email,
      phone,
      address,
      city,
      state,
    });
  }

  handleInput = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleUpdate = async (e) => {
    e.preventDefault();
    console.log();
    const { name, birthday, sex, email, phone, address, city, state } =
      this.state;
    this.props.updateUser({
      name,
      birthday,
      sex,
      email,
      phone,
      address,
      city,
      state,
    });
    const result = await axiosClient.post(
      API.USERS.UPDATE(this.props.user.id),
      { name, birthday, sex, email, phone, address, city, state }
    );
    this.setState({ message: result.data.message });
  };

  handleUpload = async (e) => {
    this.setState({ uploading: true });
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "xdqur8da");
    formData.append("folder", "comfysloth");
    const upload = await axios.post(
      `${process.env.REACT_APP_CLOUDINARY_API_URL + API.IMAGE}`,
      formData,
      { withCredentials: false }
    );
    if (upload) {
      const updateDB = await axiosClient.post(
        API.USERS.UPLOAD(this.props.user._id),
        { img: upload.data.url }
      );
      this.props.updateProfileImg(upload.data.url);
      console.log(updateDB.message);
      this.setState({ uploading: false });
    }
  };

  render() {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    } else
      return (
        <React.Fragment>
          <Breadcrumb page="Profile" />
          <section className="profile_center">
            <form
              className="profile_form"
              onSubmit={(e) => this.handleUpdate(e)}
            >
              <div className="profile_avatar">
                <label htmlFor="upload-photo" className="avatar_crl">
                  <img
                    className="avatar"
                    src={this.props.user.img}
                    alt="avatar"
                  />
                  <div className="avatar_btn">
                    <AddAPhotoIcon />
                  </div>
                </label>
                <input
                  className="input_upload"
                  id="upload-photo"
                  type="file"
                  onChange={(e) => this.handleUpload(e)}
                />
                <p
                  className={`uploading ${
                    this.state.uploading ? "active_upload" : null
                  }`}
                >
                  Uploading...
                </p>
              </div>
              <div className="profile_content">
                <label className="profile_text" htmlFor="name">
                  Name:
                </label>
                <input
                  id="name"
                  className="profile_input"
                  type="text"
                  value={this.state.name}
                  onChange={(e) => this.handleInput(e)}
                />
              </div>
              <div className="profile_content">
                <label className="profile_text" htmlFor="birthday">
                  Birthday:
                </label>
                <input
                  id="birthday"
                  className="profile_input"
                  type="date"
                  value={this.state.birthday}
                  onChange={(e) => this.handleInput(e)}
                />
              </div>
              <div className="profile_content">
                <label className="profile_text" htmlFor="sex">
                  Gender:
                </label>
                <input
                  id="sex"
                  className="profile_input"
                  type="text"
                  value={this.state.sex}
                  onChange={(e) => this.handleInput(e)}
                />
              </div>
              <div className="profile_content">
                <label className="profile_text" htmlFor="email">
                  Email:
                </label>
                <input
                  id="email"
                  className="profile_input"
                  type="email"
                  value={this.state.email}
                  onChange={(e) => this.handleInput(e)}
                />
              </div>
              <div className="profile_content">
                <label className="profile_text" htmlFor="phone">
                  Phone:
                </label>
                <input
                  id="phone"
                  className="profile_input"
                  type="tel"
                  value={this.state.phone}
                  onChange={(e) => this.handleInput(e)}
                />
              </div>
              <div className="profile_content">
                <label className="profile_text" htmlFor="address">
                  Address:
                </label>
                <input
                  id="address"
                  className="profile_input"
                  type="text"
                  value={this.state.address}
                  onChange={(e) => this.handleInput(e)}
                />
              </div>
              <div className="profile_content">
                <label className="profile_text" htmlFor="city">
                  City:
                </label>
                <input
                  id="city"
                  className="profile_input"
                  type="text"
                  value={this.state.city}
                  onChange={(e) => this.handleInput(e)}
                />
              </div>
              <div className="profile_content">
                <label className="profile_text" htmlFor="state">
                  State:
                </label>
                <input
                  id="state"
                  className="profile_input"
                  type="text"
                  value={this.state.state}
                  onChange={(e) => this.handleInput(e)}
                />
              </div>
              <button className="btn update_btn">Update your profile</button>
              <h3 className="error">{this.state.message}</h3>
            </form>
          </section>
          <Footer />
        </React.Fragment>
      );
  }
}

export default connect(mapStateToProps, { updateUser, updateProfileImg })(
  Profile
);
