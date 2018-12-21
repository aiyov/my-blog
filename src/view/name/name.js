import React from 'react';
import {Helmet} from "react-helmet";
import {connect} from 'react-redux';
import {changeName} from '../../../store/actions/paint.js';
// import { Button } from 'antd';

class NameShow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
        <ul>
          <Helmet>
            <meta charSet="utf-8"/>
            <title>姓名</title>
          </Helmet>
          <li>张三</li>
          <li>李四</li>
          <li>王麻子</li>
          {/*<li> <Button type="primary">Primary</Button></li>*/}
        </ul>
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
    onTodoClick: name => {
      dispatch(changeName(name))
    }
  }
}

const Name = connect(
  mapStateToProps,
  mapDispatchToProps
)(NameShow)

export default Name