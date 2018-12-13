import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            num: 1,
            data: '我是webpack'
        }
    }
    render() {
        return (
            <div>{this.state.num === 1?this.state.data:'我不是webpack'}</div>
        )
    }
}