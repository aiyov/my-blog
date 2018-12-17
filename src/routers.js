import React from 'react';
import {Helmet} from "react-helmet";
function Name() {
  return (
    <ul>
      <Helmet>
        <meta charSet="utf-8" />
        <title>姓名</title>
      </Helmet>
      <li>张三</li>
      <li>李四</li>
      <li>王麻子</li>
    </ul>
  )
}

function Age() {
  return (
    <ul>
      <Helmet>
        <meta charSet="utf-8" />
        <title>姓名 年龄</title>
      </Helmet>
      <li>张三 12</li>
      <li>李四 14</li>
      <li>王麻子 16</li>
    </ul>
  )
}

const routes = [
  {
    path: "/name",
    component: Name
  },{
    path: "/age",
    component: Age
  }
  // etc.
];

export default routes