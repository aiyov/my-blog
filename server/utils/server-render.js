import React from 'react';
import path from 'path';
import serve from 'koa-static';
import { preloadData}  from './utils.js';
import template from './template.js';
import ReactDOMServer from 'react-dom/server';
import staticPath from '../../dist/manifest.json';
import serverData from '../../dist/server-entry.js';

let store = null;

function serverRender(app) {
    return new Promise((resolve, reject) => {
        app.use(async(ctx, next) => {
            if(ctx.req.url.startsWith('/static/')) {
                app.use(serve(path.resolve(__dirname, '../../dist/')));
                return next()
            }

            const context = {};
            store = await preloadData(ctx, store);
            const html = ReactDOMServer.renderToString(serverData(store, ctx.req.url, context));
            if (context.status === 404) {
                ctx.status = 404
            };
            ctx.body = await template(html, store, staticPath)
            resolve()
        })
    })
}

module.exports = serverRender;