import React from 'react';
import routers from './routers.js'
import {Link, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import {changeColor} from '../store/actions/paint.js';

 class AppShow extends React.Component {
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
          <span onClick={this.clickBtn}>点击{this.props.todos.color}</span>
        {routers.map((route) => (
          <Route {...route} key={route.path} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    todos: state.canvas
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: color => {
      dispatch(changeColor(color))
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppShow)

export default App