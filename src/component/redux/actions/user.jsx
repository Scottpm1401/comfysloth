import { API } from "../../../api";
import axiosClient from "../../../interceptor";

export async function authorizedUser(dispatch) {
  if (localStorage.getItem("access_token") !== null) {
    const result = await axiosClient.put(API.USERS.AUTHENTICATE);
    dispatch({
      type: "authenticate",
      payload: result.data,
    });
  } else {
    dispatch({
      type: "authenticate",
      payload: { user: null, loggedIn: false },
    });
  }
}

export const getUser = (data) => {
  return {
    type: "getUser",
    payload: data,
  };
};

export const updateUser = (user) => {
  return {
    type: "updateUser",
    payload: user,
  };
};

export const updateProfileImg = (img) => {
  return {
    type: "updateUserImg",
    payload: img,
  };
};

export const logoutUser = () => {
  return {
    type: "logoutUser",
  };
};
