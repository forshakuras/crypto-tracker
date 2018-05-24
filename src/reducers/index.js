import { combineReducers } from "redux";
import cryptoReducer from "./reducer_crypto";
const rootReducer = combineReducers({
  cryptoData: cryptoReducer
});

export default rootReducer;
