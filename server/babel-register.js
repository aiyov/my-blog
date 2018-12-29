require('@babel/register')({
  ignore: [],
  presets: [
    [
      "@babel/preset-env",
      {
        modules: "commonjs",   // <--- must transpile to commonjs module
        targets: {"node": process.versions.node},
        useBuiltIns: "usage"   // <--- not sure if this work
      }
    ]
  ]
});
require('./index');