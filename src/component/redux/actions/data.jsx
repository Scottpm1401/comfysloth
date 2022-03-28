import { API } from "../../../api";
import axiosClient from "../../../interceptor";

export async function getData(dispatch) {
  const result = await axiosClient.get(API.PRODUCTS.LIST);
  dispatch({ type: "getData", payload: result.data });
}

export const filterData = (filter) => {
  return {
    type: "filterData",
    payload: filter,
  };
};
