import React from 'react';
import routers from './routers.js'
import {renderRoutes} from 'react-router-config'
import {connect} from 'react-redux';
import {changeColor} from '../store/actions/paint.js';

class AppShow extends React.Component {
    constructor(props) {
        super(props)
    }

    clickBtn() {
        alert(123)
    }

    render() {
        return (
            renderRoutes(routers)
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

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppShow)

export default App