import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from "./ProfileReducer";
import transactions from "./TransactionReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const combine = combineReducers({
  user,
  transactions
});

export default persistReducer(persistConfig, combine);
