export const API = {
  FEATURED: "/featured",
  USERS: {
    LOGIN: `/login`,
    AUTHENTICATE: "/users/authenticate",
    LOGOUT: "/users/logout",
    SIGNUP: "/users/signup",
    REMOVECART: (id) => `/users/removecart/${id}`,
    UPDATEQUANTITY: (id) => `/users/updatequantity/${id}`,
    CLEARCART: (id) => `/users/clearcart/${id}`,
    UPDATE: (id) => `/users/update/${id}`,
    UPLOAD: (id) => `/users/upload/${id}`,
    ADDCART: (id) => `/users/addcart/${id}`,
  },
  PRODUCTS: {
    PRODUCT: (id) => `/products/${id}`,
    LIST: "/products",
  },
  IMAGE: "/image/upload",
  PAYMENT: "/payment",
};
