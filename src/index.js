import './c.js';
import './b.js';
import './a.js';
import './index.css';
import React from 'react';
import ReactDom from 'react-dom';
import App from './app.js';

const ele = '<div>123456789</div>'

ReactDom.render(
    <App />,
  document.getElementById('root')
)
