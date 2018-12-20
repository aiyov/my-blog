import React from 'react';
import Name from '../src/view/name/name.js';
import Age from '../src/view/age/age.js';
import AgeDetail from '../src/view/age/agedetail.js';
import Root from '../src/view/root/index.js';

const routes = [
  {
    component: Root,
    data: Root.getData,
    routes: [
      {
        path: '/name/',
        exact: true,
        component: Name,
        data: Name.getData
      },
      {
        path: '/age/',
        component: Age,
        data: Age.getData,
        routes: [
          {
            path: '/age/:id',
            component: AgeDetail,
            data: AgeDetail.getData,
          }
        ]
      }
    ]
  }
]

export default routes