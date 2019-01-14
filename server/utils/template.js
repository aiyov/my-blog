import axios from 'axios';
import Helmet from 'react-helmet';
export default async (html, store)=> {
  const helmet = Helmet.renderStatic();
  const staticPath = await getStaticPath();
  var js = [];
  var css = [];
  for (var manifest in staticPath) {
    if (/\.js$/.test(manifest) && manifest !== 'app.js' && manifest !== 'vender.js' && manifest !== 'manifest.js') {
      js.push(`<script src="${staticPath[manifest]}"></script>`)
    } else if (/\.css$/.test(manifest)) {
      css.push(`<link rel="stylesheet" href="${staticPath[manifest]}">`)
    }
  }
  return (
    `<!DOCTYPE html>
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
  )
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