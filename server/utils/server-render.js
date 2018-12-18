import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import Helmet from 'react-helmet';
import App from '../../src/App.js';
import staticPath from '../../dist/manifest.json';

function serverRender(app) {
  return new Promise((resolve, reject) => {
    app.use((ctx, next) => {
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
                <title>${helmet.title.toString()}</title>
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
      resolve()
    })
  })
}

module.exports = serverRender;