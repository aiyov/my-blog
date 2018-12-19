import React from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
import {renderRoutes} from 'react-router-config'

function Name() {
    return (
        <ul>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>姓名</title>
            </Helmet>
            <li>张三</li>
            <li>李四</li>
            <li>王麻子</li>
        </ul>
    )
}

const Age = ({route})=>(
    <div>
        <ul>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>姓名 年龄</title>
            </Helmet>
            <li>张三 12</li>
            <li>李四 14</li>
            <li>王麻子 16</li>
        </ul>
        {renderRoutes(route.routes)}
    </div>
)

function SmallAge() {
    return (
        <div>SmallAge</div>
    )
}

const Root = ({route}) => (
    <div>
        <Link to="/name">姓名</Link>
        <Link to="/age">年龄</Link>
        <Link to="/age/23">年龄23</Link>
        <span>点击</span>
        {renderRoutes(route.routes)}
    </div>
)

const routes = [
    {
        component: Root,
        routes: [
            {
                path: '/name/',
                exact: true,
                component: Name
            },
            {
                path: '/age/',
                component: Age,
                routes: [
                    {
                        path: '/age/:id',
                        component: SmallAge
                    }
                ]
            }
        ]
    }
]

export default routes