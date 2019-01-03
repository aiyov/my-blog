import React from 'react';
import Head from './view/header/header.js';
import Age from '../src/view/age/age.js';
import AgeDetail from '../src/view/age/agedetail.js';
import Root from '../src/view/root/index.js';
import NotFind from './view/notfind/index.js';

const routes = [
  {
    component: Root,
    data: Root.getData,
    routes: [
      {
        path: '/header/',
        exact: true,
        component: Head,
        data: Head.getData
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
      },
      {
        component: NotFind
      }
    ]
  }
]

export default routes