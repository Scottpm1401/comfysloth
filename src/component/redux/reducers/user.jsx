const initState = {
  loggedIn: false,
  user: { cart: [], cart_total: 0, purchase: [] },
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "authenticate": {
      let newUser = {};
      action.payload.loggedIn
        ? (newUser = action.payload.user)
        : (newUser = { ...state.user });
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        user: newUser,
      };
    }
    case "getUser": {
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        user: action.payload.user,
      };
    }
    case "updateUser": {
      const { name, birthday, sex, email, phone, address, city } =
        action.payload;
      const newUser = {
        ...state.user,
        name,
        birthday,
        sex,
        email,
        phone,
        address,
        city,
        state: action.payload.state,
      };
      return {
        ...state,
        user: newUser,
      };
    }

    case "updateUserImg": {
      const newUser = { ...state.user };
      newUser.img = action.payload;
      return {
        ...state,
        user: newUser,
      };
    }

    case "logoutUser": {
      return initState;
    }

    //CART

    case "addCart": {
      const newCart = { ...state.user };
      newCart.cart.push(action.payload);
      newCart.cart_total += action.payload.price * action.payload.quantity;
      return {
        ...state,
        user: newCart,
      };
    }

    case "removeCart": {
      const newCart = { ...state.user };
      newCart.cart = newCart.cart.filter(
        (product) =>
          product.id !== action.payload.id ||
          product.color !== action.payload.color
      );
      newCart.cart_total -= action.payload.prices;
      return {
        ...state,
        user: newCart,
      };
    }

    case "addQuantity": {
      const newCart = { ...state.user };
      const index = newCart.cart.findIndex(
        (product) =>
          product.id === action.payload.id &&
          product.color === action.payload.color
      );
      newCart.cart[index].quantity += action.payload.quantity;
      newCart.cart_total += action.payload.price * action.payload.quantity;
      return {
        ...state,
        user: newCart,
      };
    }

    case "minusQuantity": {
      const newCart = { ...state.user };
      const index = newCart.cart.findIndex(
        (product) =>
          product.id === action.payload.id &&
          product.color === action.payload.color
      );
      newCart.cart[index].quantity -= action.payload.quantity;
      newCart.cart_total -= action.payload.price * action.payload.quantity;
      return {
        ...state,
        user: newCart,
      };
    }
    case "clearCart": {
      const newUser = { ...state.user };
      newUser.cart = [];
      newUser.cart_total = 0;
      return {
        ...state,
        user: newUser,
      };
    }
    //Purchase
    case "addPurchase": {
      const newPurchase = { ...state.user };
      newPurchase.purchase.push(action.payload);
      return {
        ...state,
        user: newPurchase,
      };
    }
    default:
      return state;
  }
};
