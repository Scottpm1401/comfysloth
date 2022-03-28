export const searchFilter = (text) => {
  return {
    type: "searching",
    payload: text,
  };
};

export const categoryFilter = (category) => {
  return {
    type: "category",
    payload: category,
  };
};

export const brandFilter = (brand) => {
  return {
    type: "brand",
    payload: brand,
  };
};

export const colorFilter = (color) => {
  return {
    type: "color",
    payload: color,
  };
};

export const priceFilter = (price) => {
  return {
    type: "price",
    payload: price,
  };
};

export const freeshipFilter = (freeship) => {
  return {
    type: "freeship",
    payload: freeship,
  };
};

export const sortFilter = (sort) => {
  return {
    type: "sort",
    payload: sort,
  };
};

export const clearFilter = () => {
  return {
    type: "clear",
  };
};
