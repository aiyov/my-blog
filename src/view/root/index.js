import React from 'react';
import {Link} from 'react-router-dom';
import {renderRoutes} from 'react-router-config'
import {connect} from 'react-redux';
import {changeColor} from "../../../store/actions/paint";

class RootShow extends React.Component {
  constructor(props) {
    super(props)
  }

  static getData(store) {
    store.dispatch(changeColor('#000'))
  }

  componentDidMount() {
    console.log(this.props.todos)
  }

  render() {
    return (
      <div>
        <Link to="/name">姓名</Link>
        <Link to="/age">年龄</Link>
        <Link to="/age/23">年龄23</Link>
        <span>点击{this.props.todos.color}</span>
        {renderRoutes(this.props.route.routes)}
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

const Root = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootShow)

export default Root