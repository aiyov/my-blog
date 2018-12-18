import React from 'react';
import routers from './routers.js'
import {Link, Route, BrowserRouter} from 'react-router-dom'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
    clickBtn() {
      alert(123)
    }
  render() {
    return (
      <div>
        <Link to="/name">姓名</Link>
        <Link to="/age">年龄</Link>
          <span onClick={this.clickBtn}>点击我</span>
        {routers.map((route) => (
          <Route {...route} key={route.path} />
        ))}
      </div>
    )
  }
}