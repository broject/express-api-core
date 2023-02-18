import http from 'http';
import https from 'https';
import Site, { App } from './site';

export function CreateServer(dirname, options) {
    var app = Site.instance(dirname);
    var server = null;
    if (options && options.use_ssl)
        server = https.createServer(options, app);
    else
        server = http.createServer(app);
    return server;
}

export function InitModules(activeModules, moduleDir) {
    if (!moduleDir) moduleDir = '/../modules/';
    if (!moduleDir.endsWith('/')) moduleDir += '/';
    activeModules.forEach(name => {
        const module = require(App.get('__dirname') + moduleDir + name);
        if (module.init) module.init();
        else if (module.default) module.default();
        else module();
    });
}

export function createServerWithModule(options) {
    var server = CreateServer(options);
    var configs = require('../configs');
    if (configs && configs.active_modules) {
        InitModules(configs.active_modules);
    }
    return server;
}

export default createServerWithModule;