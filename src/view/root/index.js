import React from 'react';

import {Layout, Row, Col} from 'antd';

const {Header, Footer, Sider, Content} = Layout;
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
            <Layout style={{height: '100%'}}>
                <Header style={{background: '#fff'}}>Header</Header>
                <Layout>
                    <Content style={{background: '#ccc'}}>Content</Content>
                    <Sider width="400" theme="light">Sider</Sider>
                </Layout>
                <Footer style={{background: '#fff'}}>Footer</Footer>
            </Layout>
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