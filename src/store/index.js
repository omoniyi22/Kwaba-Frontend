import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import logger, { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";




import rootRuducer from './reducers'


const configureStore = () => {
  const store = createStore(
    rootRuducer,
    compose(
      applyMiddleware(thunk)
      // , typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
  const persistor = persistStore(store)
  return { store, persistor }
}

export default configureStore();
