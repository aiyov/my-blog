import path from 'path';
import koa from 'koa2';
import proxy from 'koa-proxies';
import React from 'react';
import serve from 'koa-static';
import staticCache from 'koa-static-cache';
import serverRender from './utils/server-render.js';
import {devRender, getStaticPath} from './utils/dev-render.js';
import staticRouter from './utils/dev-render.js';
const app = new koa();
const isDev = process.env.NODE_ENV === 'development';

if (!isDev) {
  app.use(staticCache(path.resolve(__dirname, '../dist'), {
    maxAge: 24 * 60 * 60
  }))
  app.use(serve(path.resolve(__dirname, '../dist/')));
  serverRender(app)
} else {
  app.use(staticRouter.routes(), staticRouter.allowedMethods())
  app.use(proxy('/static', {
    target: 'http://localhost:3111',
    logs: true
  }))
}

app.listen("9000", function () {
  console.log("open Browser http://localhost:9000");
});

