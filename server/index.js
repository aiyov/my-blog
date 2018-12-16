import path from 'path';
import koa from 'koa2';
import {createServer} from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import App from '../src/App.js';
import serve from 'koa-static';
import staticCache from 'koa-static-cache';
import staticPath from '../dist/manifest.json'
const router = require('koa-router')();

const app = new koa();

app.use(staticCache(path.resolve(__dirname, '../dist'), {
    maxAge: 24 * 60 * 60
}))

app.use(router.routes())

router.get('*',(ctx, next)=>{
    console.log(ctx.req.url)
    next()
})


app.use((ctx, next) => {
    console.log(123)
    console.log(ctx.req.url)
    if (ctx.req.url.startsWith('/js/') || ctx.req.url.startsWith('/favicon.ico')) {
        return next()
    }
    const context = {}
    const html = ReactDOMServer.renderToString(
        <StaticRouter location={ctx.req.url} context={context}>
            <App/>
        </StaticRouter>
    )
    ctx.body = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="theme-color" content="#000000">
            <title>react-ssr</title>
        </head>
        <body>
            <noscript>
            You need to enable JavaScript to run this app.
            </noscript>
            <div id="root">${html}</div>
            <script src="${staticPath['manifest.js']}"></script>
            <script src="${staticPath['vender.js']}"></script>
            <script src="${staticPath['app.js']}"></script>
        </body>
    </html>`
})

console.log(path.resolve(__dirname, '../dist/'))

app.use(serve(path.resolve(__dirname, '../dist/')))

app.listen("9000", function () {
    console.log("open Browser http://localhost:9000");
});

