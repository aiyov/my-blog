import path from 'path';
import webpack from 'webpack';
import MemoryFs from 'memory-fs';
import Router from 'koa-router';
import configStore from '../../store/store/index.js';
import {matchRoutes} from 'react-router-config';
import routes from '../../src/routers.js';
import serverRender  from './render.js'
import serverConfig from '../../config/webpack.config.server.js';
import NativeModule from 'module';
import vm from 'vm';

let store = null;
let serverBundle

const router = Router();
const mfs = new MemoryFs;
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;

const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true,
  })
  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = getModuleFromString(bundle, 'server-entry.js')
  serverBundle = m.exports
})

router.get('*', async (ctx, next) => {
  if (ctx.req.url.startsWith('/static/') || ctx.req.url.indexOf('hot-update') !== -1) {
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
  await serverRender(serverBundle, store, ctx)
})

module.exports = router;