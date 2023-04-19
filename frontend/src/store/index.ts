// import { applyMiddleware, createStore, compose, Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import allreducers from './combineReducers';

// let composeEnhancers = compose;

/*if (UserRequest.apiConfig.mode === "development" || UserRequest.apiConfig.mode === "productionqa" || UserRequest.apiConfig.mode === "productiondev") {

  composeEnhancers = typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
}*/

// const store: Store<any> = createStore(
//   allreducers,
//   composeEnhancers(applyMiddleware(thunk))
// );

const store = configureStore({
  reducer: allreducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',  // devtools disabled for production
  // preloadedState,   It is out initial state
  // enhancers: [batchedSubscribe(debounceNotify)],
});

export default store;
