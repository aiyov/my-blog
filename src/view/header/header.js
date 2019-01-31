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
      <header id="header">
        <div id="banner"></div>
        <div id="header-outer" className="outer">
          <div id="header-inner" className="inner">
            <nav id="sub-nav">
              <a id="nav-search-btn" className="nav-icon" title="搜索"></a>
            </nav>
            <div id="search-form-wrap">
              <form action="//google.com/search" method="get" className="search-form">
                <input type="search" name="q" className="search-form-input" placeholder="Search"/>
                <button type="submit" className="search-form-submit">&#xF002;</button>
                <input type="hidden" name="sitesearch" value="http://findjay.cn"/>
              </form>
            </div>
            <nav id="main-nav">
              <a id="main-nav-toggle" className="nav-icon"></a>
              <a className="main-nav-link" href="/">首页</a>
              <a className="main-nav-link" href="/archives">归档</a>
              <a className="main-nav-link" href="/about">关于</a>
            </nav>
          </div>
          <div id="header-title" className="inner">
            <h1 id="logo-wrap">
              <a href="/" id="logo">AIYOV</a>
            </h1>
          </div>
        </div>
      </header>
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