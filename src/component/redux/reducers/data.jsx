const initState = {
  maindata: [],
  tempdata: [],
};

export const dataReducer = (state = initState, action) => {
  switch (action.type) {
    case "getData": {
      return {
        ...state,
        maindata: action.payload,
        tempdata: action.payload.sort((a, b) =>
          a.price > b.price ? 1 : a.price < b.price ? -1 : 0
        ),
      };
    }
    case "filterData": {
      const filter = action.payload;
      const newTempdata = state.maindata.filter((product) => {
        return (
          (product.category === filter.category || filter.category === "all") &&
          (product.brand === filter.brand || filter.brand === "all") &&
          (product.colors.findIndex((color) => color === filter.color) === 0 ||
            filter.color === "all") &&
          product.price <= filter.price &&
          (product.freeship === filter.freeship || filter.freeship === false) &&
          product.title.toUpperCase().indexOf(filter.search.toUpperCase()) > -1
        );
      });
      switch (filter.sort) {
        case "lowest": {
          newTempdata.sort((a, b) => (a.price > b.price ? 1 : -1));
          break;
        }
        case "highest": {
          newTempdata.sort((a, b) => (a.price > b.price ? -1 : 1));
          break;
        }
        case "a": {
          newTempdata.sort((a, b) => (a.title > b.title ? 1 : -1));
          break;
        }
        case "z": {
          newTempdata.sort((a, b) => (a.title > b.title ? -1 : 1));
          break;
        }
        default:
          break;
      }
      return {
        ...state,
        tempdata: newTempdata,
      };
    }
    default:
      return state;
  }
};
