import React from 'react';
import {Helmet} from "react-helmet";
import Head from '../header/header.js';
import {connect} from 'react-redux';
import {changeColor} from "../../../store/actions/paint";
import './index.css';

class RootShow extends React.Component {
  constructor(props) {
    super(props)
  }

  static getData(store) {
    store.dispatch(changeColor('#000'))
  }

  componentDidMount() {
  }

  render() {
    return (
      <div style={{height: '100%'}}>
          <Helmet>
              <meta charSet="utf-8"/>
              <title>my blog</title>
          </Helmet>
          <Head />
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