import React from 'react';
import axios from 'axios';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import Helmet from 'react-helmet';
import Router from 'koa-router';
import {Provider} from 'react-redux';
// import App from '../../src/App.js';
import configStore from '../../store/store/index.js';
import {matchRoutes} from 'react-router-config';
import routes from '../../src/routers.js';

const router = Router();

var store = null;

router.get('*', async (ctx, next) => {
    if (ctx.req.url.startsWith('/static/')) {
        return next()
    }
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
    await devRender(ctx)
})

async function devRender(ctx) {
    const staticPath = await getStaticPath();
    var js = [];
    var css = [];
    for (var manifest in staticPath) {
        if (/\.js$/.test(manifest) && manifest !== 'app.js' && manifest !== 'vendor.js' && manifest !== 'manifest.js') {
            js.push(`<script src="${staticPath[manifest]}"></script>`)
        } else if (/\.css$/.test(manifest)) {
            css.push(`<link rel="stylesheet" href="${staticPath[manifest]}">`)
        }
    }
    /*const context = {}
    const html = ReactDOMServer.renderToString(
        <StaticRouter location={ctx.req.url} context={context}>
            <Provider store={store}>
                <App/>
            </Provider>
        </StaticRouter>
    );*/
    const html = getHtml(ctx);
    /*if (context.status === 404) {
        ctx.status = 404
    };*/

    const helmet = Helmet.renderStatic();
    ctx.body = `<!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
              <meta name="theme-color" content="#000000">
              <link rel="icon" href="/static/favicon.ico" type="image/vnd.microsoft.icon">
              ${css.join('')}
              ${helmet.title.toString()}
          </head>
          <body>
              <noscript>
              You need to enable JavaScript to run this app.
              </noscript>
              <div id="root" style="height: 100%">${html}</div>
              <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}
              </script> 
              ${staticPath["manifest.js"] ? `<script src="${staticPath["manifest.js"]}"></script>` : ''}
              ${staticPath["vender.js"] ? `<script src="${staticPath["vender.js"]}"></script>` : ''}
              ${staticPath["app.js"] ? `<script src="${staticPath["app.js"]}"></script>` : ''}
              ${js.join('')}
          </body>
      </html>`
}

function getStaticPath() {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3111/manifest.json')
            .then(res => {
                resolve(res.data);
            })
            .catch(reject)
    })
}

function getHtml(ctx) {
    const App = require('../../src/App.js').default;
    const context = {}
    return (
        ReactDOMServer.renderToString(
            <StaticRouter location={ctx.req.url} context={context}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </StaticRouter>
        )
    )
}

module.exports = router;