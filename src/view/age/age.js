import React from 'react';
import {Helmet} from "react-helmet";
import {renderRoutes} from 'react-router-config';
import {connect} from 'react-redux';
import {changeAge} from '../../../store/actions/paint.js';

class AgeShow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <ul>
          <Helmet>
            <meta charSet="utf-8"/>
            <title>姓名 年龄</title>
          </Helmet>
          <li>张三 12</li>
          <li>李四 14</li>
          <li>王麻子 16</li>
        </ul>
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
    onTodoClick: age => {
      dispatch(changeAge(age))
    }
  }
}

const Age = connect(
  mapStateToProps,
  mapDispatchToProps
)(AgeShow)

export default Age