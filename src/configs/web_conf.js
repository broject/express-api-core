module.exports = {
    module_name: 'WebSite',
    name_space: '/*',
    /* WebSite Core */
    urlencoded_extended: true, /*if true then recognize user[username] to {user: { username: ''}}*/
    parser_json_limit: '50mb',
    use_jade_engine: false, /*default view engine*/
    view_engine_name: 'ejs',
    view_engine_ext: '.ejs',
    view_charset: 'utf8',
    disable_view_cache: true, /*app.cache*/
    disable_etag: true, /*disable<304 Not Modified>*/
    session_store: 'redis-store',/*memory-store,redis-store,mysql-store*/
    use_session: true, /*if false then use cookie session*/
    use_app_debugger: true,
    use_request_logger: true,
    use_request_routes: true,
    use_error_handler: true,
    use_compression: false,
    use_helmet: false, /*disable X-Powered-By header*/
    /* Resources */
    static_path: '/assets',
    media_path: '/assets/media',
    theme_path: '/assets/themes',
    static_dirname: 'public',
    view_dirname: 'views',
    default_theme_name: 'sites',
    /* CSRF Token */
    csrf_protection: false,
    csrf_token_name: '__csrftkn__',
    csrf_cookie_name: '__csrfck__',
    csrf_expire: 7200,
    csrf_regenerate: true,
    csrf_exclude_uris: [],
    /* Views or Themes */
    language: 'mn',
    supported_languages: { mn: 'Монгол', en: 'English' },
    subdomain_is_language: false,
    language_is_view_dirname: false,
    default_theme: 'default',
}