import path from 'path';
import koa from 'koa2';
import {createServer} from 'http';
import React from 'react';
import serve from 'koa-static';
import staticCache from 'koa-static-cache';

import serverRender from './utils/server-render.js';
import {devRender, getStaticPath} from './utils/dev-render.js';

const app = new koa();

const isDev = process.env.NODE_ENV === 'development';
console.log(isDev)
if(!isDev) {
  app.use(staticCache(path.resolve(__dirname, '../dist'), {
    maxAge: 24 * 60 * 60
  }))
  app.use(serve(path.resolve(__dirname, '../dist/')));
  serverRender(app)
} else {
    getStaticPath().then((path)=>{
        devRender(app, path)
    })
}

app.listen("9000", function () {
  console.log("open Browser http://localhost:9000");
});

