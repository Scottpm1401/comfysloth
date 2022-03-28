const initState = {
  layout: 1,
};

export const layoutReducer = (state = initState, action) => {
  switch (action.type) {
    case "changeLayout": {
      return {
        ...state,
        layout: action.payload,
      };
    }

    default:
      return state;
  }
};
