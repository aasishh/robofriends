import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { searchRobots, requestRobots } from './reducers';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import './index.cssimport 'tachyons';

const logger = createLogger();

const rootReducer = combineReducers({searchRobots, requestRobots}) //accepts all the reducers as an object
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger)); // thunk helps to implement async redux state';


ReactDOM.render(
  <React.StrictMode>
  	<Provider store={store}>
   	 <App />
   	</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

