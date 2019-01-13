require('@babel/register')({
    ignore: [],
    sourceMaps: false,
    presets: [
        [
            "@babel/preset-env",
            {
                modules: "commonjs",   // <--- must transpile to commonjs module
                targets: {"node": process.versions.node},
                useBuiltIns: "entry"   // <--- not sure if this work
            }
        ]
    ]
});
require('./index');