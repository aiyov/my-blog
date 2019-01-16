import axios from 'axios';
import template from './template.js';
import ReactDOMServer from 'react-dom/server';
import configStore from '../../store/store/index.js';
import {matchRoutes} from 'react-router-config';
import routes from '../../src/routers.js';

function devRender(bundle, store, ctx) {
  return new Promise(async (resolve, reject) => {
    if(!bundle) {
      ctx.body = 'waiting for compile, refresh later';
      resolve();
      return false;
    }
    const createApp = bundle.default;
    const routerContext = {};
    const app = createApp(store, ctx.req.url, routerContext);
    if (routerContext.status === 404) {
      ctx.status = 404
    };
    const path = await getStaticPath()
    const html = ReactDOMServer.renderToString(app)
    console.log(html)
    ctx.body = await template(html, store, path);
    resolve()
  }).catch((error)=>{
    console.log(error)
  })
}

async function preloadData(ctx, store) {
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
    return store;
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
module.exports = {devRender, preloadData}