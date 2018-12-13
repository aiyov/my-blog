import './c.js';
import './a.js'
import './index.css';
import ReactDom from 'react-dom';

const ele = '<div>123456789</div>'

ReactDom.render(
  ele,
  document.getElementById('root')
)
