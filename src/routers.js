import React from 'react';
function Name() {
  return (
    <ul>
      <li>张三</li>
      <li>李四</li>
      <li>王麻子</li>
    </ul>
  )
}

function Age() {
  return (
    <ul>
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