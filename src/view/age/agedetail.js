import React from 'react';
import {connect} from 'react-redux';
import {changeColor, asyncChangeName} from '../../../store/actions/paint.js';

class AgedetailShow extends React.Component {
  constructor(props) {
    super(props)
  }
  static async getData(store) {
    await store.dispatch(asyncChangeName('哎哟，好痛'))
  }
  render() {
    return (
      <div>SmallAge</div>
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

const Agedetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(AgedetailShow)

export default Agedetail