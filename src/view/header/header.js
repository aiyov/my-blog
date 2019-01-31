import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Menu} from 'antd';
import {changeName} from '../../../store/actions/paint.js';

const SubMenu = Menu.SubMenu;

class HeaderShow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Row type="flex" justify="center">
        <Col span={20}>
          <h1 style={{display: 'inline'}}>AIYOV</h1>
          <Menu mode="horizontal">
            <Menu.Item key="home">首页</Menu.Item>
            <Menu.Item key="archived">归档</Menu.Item>
            <Menu.Item key="about">关于</Menu.Item>
          </Menu>
        </Col>
      </Row>
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

const Head = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderShow)

export default Head