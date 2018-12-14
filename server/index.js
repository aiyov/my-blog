import koa from 'koa2';
import { createServer } from 'http';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../src/App.js';
const app = new koa();

app.use((ctx, next)=>{

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
        </body>
    </html>`
})
app.listen("9000", function () {
  console.log("open Browser http://localhost:9000");
});

