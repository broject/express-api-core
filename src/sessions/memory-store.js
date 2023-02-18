exports.configure = function (app) {
    var configs = require('../configs');
    var common = require('../core/common');

    var session = require('express-session');

    var sess_object = {
        name: configs.session.name,
        secret: configs.session.secret,
        resave: configs.session.resave,
        saveUninitialized: configs.session.saveUninitialized,
        cookie: {
            httpOnly: configs.cookie.http_only,
            // secure: configs.cookie.secure,
            path: configs.cookie.default_path,
            maxAge: configs.cookie.expiration_second * 1000
        },
        genid: function (req) {
            return common.uuid(req);
        }
    };

    app.set('trust proxy', 1); // trust first proxy
    const app_session = session(sess_object);
    app.use(app_session);

    if (configs.session.test) {
        app.get(configs.session.test_uri, function (req, res, next) {
            if (req.session.views) {
                req.session.views++;
                res.setHeader('Content-Type', 'text/html');
                res.write('<p>views: ' + req.session.views + '</p>');
                res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
                res.end();
            } else {
                req.session.views = 1;
                res.end('welcome to the session demo. refresh!');
            }
            next();
        });
    }

    return app_session;
};