import { FETCH_CRYPTO_DATA } from "../actions/index";
import _ from "lodash";

export default function(state = [], action) {
  //console.log("Action received,", action);
  switch (action.type) {
    case FETCH_CRYPTO_DATA:
      //return state.concat([action.payload.data]);
      //don't manimulate state with state.push always create a new state
      return _.values(action.payload.data.data);
  }
  return state;
}
