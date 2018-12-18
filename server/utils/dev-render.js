import React from 'react';
import axios from 'axios';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import Helmet from 'react-helmet';
import proxy from 'koa-proxies';
import App from '../../src/App.js';

//todo router 404 偶现

function getStaticPath() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3111/manifest.json')
            .then(res => {
                resolve(res.data)
            })
            .catch(reject)
    })
}

function devRender(app, staticPath) {
    return new Promise((resolve, reject) => {
        app.use(proxy('/static', {
            target: 'http://localhost:3111'
        }))
        app.use((ctx, next) => {
            console.log('=============')
            console.log(ctx.req.url)
            const context = {}
            const html = ReactDOMServer.renderToString(
                <StaticRouter location={ctx.req.url} context={context}>
                    <App/>
                </StaticRouter>
            )
            const helmet = Helmet.renderStatic();
            ctx.body = `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                        <meta name="theme-color" content="#000000">
                        <link rel="icon" href="/static/favicon.ico" type="image/vnd.microsoft.icon">
                        ${helmet.title.toString()}
                    </head>
                    <body>
                        <noscript>
                        You need to enable JavaScript to run this app.
                        </noscript>
                        <div id="root">${html}</div>
                        <script src="${staticPath['app.js']}"></script>
                    </body>
                </html>`
            resolve()
        })
    })
}

module.exports = {
    devRender,
    getStaticPath
};