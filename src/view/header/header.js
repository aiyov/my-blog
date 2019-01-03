import React from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'antd';
import {changeName} from '../../../store/actions/paint.js';

class HeaderShow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Row type="flex" justify="center">
        <Col span={18}>AIYOV123</Col>
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