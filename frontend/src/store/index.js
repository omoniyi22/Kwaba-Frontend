import { createStore, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";

import { persistStore } from "redux-persist";
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
