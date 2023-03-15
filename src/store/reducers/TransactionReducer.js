import {
  GET_ALL_TRANSACTIONS
} from "../types";

const initialState = {
  transactions: [{}]
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    default:
      return state;
  }
}
