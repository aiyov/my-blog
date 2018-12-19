import React from 'react';
import App from './App.js';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import configStore from '../store/store/index.js';
import { Provider } from 'react-redux';

const preloadedState = window.__INITIAL_STATE__;
console.log(preloadedState)

const store = configStore();

ReactDOM.hydrate((
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
), document.getElementById('root'))