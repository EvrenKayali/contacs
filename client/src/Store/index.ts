import { combineReducers, applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { contactReducer } from "./Reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  contact: contactReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
