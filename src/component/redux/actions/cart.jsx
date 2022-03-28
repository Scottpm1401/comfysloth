export const addToCart = (product) => {
  return {
    type: "addCart",
    payload: product,
  };
};

export const removeFromCart = (product) => {
  return {
    type: "removeCart",
    payload: product,
  };
};

export const addQuantity = (product) => {
  return {
    type: "addQuantity",
    payload: product,
  };
};

export const minusQuantity = (product) => {
  return {
    type: "minusQuantity",
    payload: product,
  };
};

export const clearCart = () => {
  return {
    type: "clearCart",
  };
};
