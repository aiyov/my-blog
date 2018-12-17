import React from 'react';
import App from './App.js';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

const renderMethod = !module.hot ? ReactDOM.render : ReactDOM.hydrate
renderMethod((
  <BrowserRouter>
      <App/>
  </BrowserRouter>
), document.getElementById('root'))