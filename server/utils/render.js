import template from './template.js';
import ReactDOMServer from 'react-dom/server';

export default (bundle, store, ctx) => {
  return new Promise(async (resolve, reject) => {
    if(!bundle) {
      ctx.body = 'waiting for compile, refresh later';
      resolve();
      return false;
    }
    const createApp = bundle.default
    const routerContext = {}
    const app = createApp(store, ctx.req.url, routerContext)
    if (routerContext.status === 404) {
      ctx.status = 404
    };
    const html = ReactDOMServer.renderToString(app)
    ctx.body = await template(html, store);
    resolve()
  }).catch((error)=>{
    console.log(error)
  })
}