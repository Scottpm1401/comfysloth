const initState = {
  search: "",
  category: "all",
  brand: "all",
  color: "all",
  price: 3499.99,
  freeship: false,
  sort: "lowest",
};

export const filterReducer = (state = initState, action) => {
  switch (action.type) {
    case "searching": {
      return { ...state, search: action.payload };
    }
    case "category": {
      return { ...state, category: action.payload };
    }
    case "brand": {
      return { ...state, brand: action.payload };
    }
    case "color": {
      return { ...state, color: action.payload };
    }
    case "price": {
      return { ...state, price: action.payload };
    }
    case "freeship": {
      return { ...state, freeship: action.payload };
    }
    case "sort": {
      return { ...state, sort: action.payload };
    }
    case "clear": {
      return initState;
    }
    default:
      return state;
  }
};
