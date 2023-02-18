/**
 * on '/api/v2:/api', /api/v2 is request.path, :/api is route's folder (/controllers/api/*.js)
 */
module.exports = {
    routes_dir: '/controllers',
    routes_area: ['/',
        '/contact:/home/contact',
        '/api', '/api/v2:/api', '/v2/api:/api'
    ]
}