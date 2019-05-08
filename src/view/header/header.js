import React from 'react';
import {connect} from 'react-redux';
import {Row, Col, Menu, Icon} from 'antd';
import {changeName} from '../../../store/actions/paint.js';

class HeaderShow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Row type="flex" justify="center" style={{height: '100%'}}>
        <Col span={20}>
            <Menu mode="horizontal" style={{height: '100%'}}>
                <Menu.Item>首页</Menu.Item>
                <Menu.Item>归档</Menu.Item>
                <Menu.Item>关于</Menu.Item>
                <Menu.Item>
                    <Icon type="search" />
                </Menu.Item>
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