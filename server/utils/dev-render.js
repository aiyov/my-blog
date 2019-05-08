import vm from 'vm';
import path from 'path';
import React from 'react';
import webpack from 'webpack';
import Router from 'koa-router';
import MemoryFs from 'memory-fs';
import NativeModule from 'module';
import {devRender, preloadData}  from './utils.js';
import serverConfig from '../../config/webpack.config.server.js';

let store = null;
let serverBundle;

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
  store = await preloadData(ctx, store);
  await devRender(serverBundle, store, ctx)
})

module.exports = router;