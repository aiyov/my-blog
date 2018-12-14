import React from 'react';
import routers from './routers.js'
import {Link, Route, Switch} from 'react-router-dom'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Link to="/name">姓名</Link>
        <Link to="/age">年龄</Link>
        {routers.map(route => (
          <Route {...route} />
        ))}
      </div>
    )
  }
}