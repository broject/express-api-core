import { Router } from 'express';
import { App } from './site';

export function Routes(route_root, route_conf) {
    const fs = require('fs');
    const path = require('path');
    if (!route_conf) {
        const express = require('express');
        route_conf = route_root;
        route_root = express.Router();
    }
    var router = route_root;
    var conf = route_conf || require('../configs/route_conf');
    conf.routes_area.forEach(function (area) {
        var area_path = area;
        if (area.indexOf(':') > 0) {
            var areaSegs = area.split(':');
            area = areaSegs[0];
            area_path = areaSegs[1];
        } else {
            if (area_path === '/') { area_path = ''; }
        }

        var route_dir = path.join(App.get('__dirname'), conf.routes_dir, area_path);
        // console.log('*area', area, route_dir, fs.existsSync(route_dir));
        if (!fs.existsSync(route_dir)) return;

        var file_list = fs.readdirSync(route_dir);
        file_list.forEach(file => {
            var route_file = path.join(route_dir, file);

            if (fs.lstatSync(route_file).isFile() && route_file.endsWith('.js')) {
                var req_path = route_file.substring(0, route_file.length - 3);
                // console.log('*', area, '->', req_path, fs.existsSync(route_file));
                var req_file = require(req_path);

                if (req_file && req_file.default) {
                    if (area === '/') {
                        req_file.default(router);
                    } else {
                        var new_router = new Router();
                        req_file.default(new_router);
                        router.use(area, new_router);
                    }
                }
            }
        });
    });
    return router;
}

export default Routes;