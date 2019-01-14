import csshook from 'css-modules-require-hook/preset';
import assethook from 'asset-require-hook';

assethook({
    extensions: ['png', 'jpg']
});
import koa from 'koa2';
import proxy from 'koa-proxies';
import React from 'react';
import staticCache from 'koa-static-cache';
import {devRender, getStaticPath} from './utils/dev-render.js';
import staticRouter from './utils/dev-render.js';
import serverRender from './utils/server-render';
const app = new koa();
const isDev = process.env.NODE_ENV === 'development';
if (!isDev) {
    /*app.use(staticCache(path.resolve(__dirname, '../dist'), {
        maxAge: 0
    }))*/
    serverRender(app)
} else {
    app.use(staticRouter.routes(), staticRouter.allowedMethods())
    app.use(proxy('/', {
        target: 'http://localhost:3111',
        logs: false
    }))
}

app.listen("9000", function () {
    console.log("open Browser http://localhost:9000");
});

