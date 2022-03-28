import { layoutReducer } from "./layout";
import { dataReducer } from "./data";
import { filterReducer } from "./filter";
import { userReducer } from "./user";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  updatelayout: layoutReducer,
  data: dataReducer,
  filter: filterReducer,
  user: userReducer,
});

export default rootReducer;
