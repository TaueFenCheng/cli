#!/usr/bin/env node

console.log('Welcome to taueCli 脚手架');
const nodeModule = require("node:module");
// enable on-disk code caching of all modules loaded by Node.js
// requires Nodejs >= 22.8.0
const { enableCompileCache } = nodeModule;
if (enableCompileCache) {
    try {
        enableCompileCache();
    } catch {
        // ignore errors
    }
}

const { inquirerFn } = require('../dist/index')

async function runCLI() {
    // const cli = new RspackCLI();
    // await cli.run(process.argv);
    inquirerFn(process.argv)
}

runCLI();