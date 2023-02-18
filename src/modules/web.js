import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app } from "../core/site";

export default () => {
    const express = require('express');
    const path = require('path');
    const web_conf = require('../configs/web_conf');

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: web_conf.urlencoded_extended }));// parse application/x-www-form-urlencoded
    app.use(bodyParser.json({ limit: web_conf.parser_json_limit }));// parse application/json
    app.use(cors());
    app.use(web_conf.static_path, express.static(web_conf.static_dirname));
    app.set(web_conf.view_dirname, path.join(app.get('__dirname'), web_conf.view_dirname));
    // console.log('*__', path.join(app.get('__dirname'), web_conf.view_dirname));

    if (web_conf.use_jade_engine) {
        app.engine('jade', require('jade').__express);
        app.set('view engine', 'jade');
    } else {
        app.set('view engine', web_conf.view_engine_name);
    }

    if (web_conf.disable_view_cache) {
        app.disable('view cache');
    } else {
        app.set('view cache', true);
    }

    if (web_conf.disable_etag) {
        app.disable('etag');
    }

    if (web_conf.use_compression) {
        var compression = require('compression');
        app.use(compression());
    }

    if (web_conf.use_helmet) {
        var helmet = require('helmet');
        var nocache = require('nocache');
        app.use(helmet());
        app.use(nocache());
        app.use(helmet.frameguard());
    } else {
        app.disable('x-powered-by');
    }

    /* app session */
    if (web_conf.use_session) {
        var sessionStore = require('../sessions/' + web_conf.session_store);
        sessionStore.configure(app);
    }

    /* app debugging */
    if (web_conf.use_app_debugger) {
        const { AppDebugger } = require('../core/debugger');
        app.use(AppDebugger);
    }

    /* app logging */
    if (web_conf.use_request_logger) {
        const { AppLogger } = require('../core/debugger');
        app.use(AppLogger);
    }

    /* app routing */
    if (web_conf.use_request_routes) {
        var route_conf = require('../configs/route_conf');
        const { Routes } = require('../core/routes');
        app.use(Routes(route_conf));
    }

    /* error handler */
    if (web_conf.use_error_handler) {
        const { AppErrorHandler } = require('../core/errhandler');
        app.use(AppErrorHandler);
    }

    return app;
};