import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import path from 'path';
import Helmet from 'react-helmet';
import {Provider} from 'react-redux';
import serve from 'koa-static';
import App from '../../src/App.js';
import staticPath from '../../dist/manifest.json';
import configStore from '../../store/store/index.js';
import {matchRoutes} from 'react-router-config';
import serverEntry from '../../dist/server-entry.js';
import routes from '../../src/routers.js';
import render from './render.js'

let store = null;

async function preloadData(ctx) {
  store = configStore();
  const matchedRoutes = matchRoutes(routes, ctx.req.url);
  const promise = [];
  /*收集所有匹配路由的加载数据的方法*/
  matchedRoutes.forEach((route) => {
    if (route.route.data) {
      const task = new Promise((resolve, reject) => {
        Promise.resolve(route.route.data(store)).then(resolve).catch(resolve)
        /*防止错误阻塞页面加载*/
      });
      promise.push(task)
    }
  });
  await Promise.all(promise);
}

function serverRender(app) {
  return new Promise((resolve, reject) => {
    app.use(async (ctx, next) => {
      if (ctx.req.url.startsWith('/static/')) {
        app.use(serve(path.resolve(__dirname, '../../dist/')));
        return next()
      }
      await preloadData(ctx)
      await render(serverEntry, store, ctx)
    })
  })
}

module.exports = serverRender;