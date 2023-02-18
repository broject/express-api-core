module.exports = {/* for server */
    is_local_test: false,
    active_modules: ['web'],
    /* systems */
    use_ssl: false,
    timezone: 'UTC',
    charset: 'UTF-8',
    local_timezone: 'Asia/Ulaanbaatar',//8 hour
    local_timeback_second: 3600,
    /* Log File Variables */
    log_threshold: 0, //0 is none, 1 is debug, 2 is error else all
    log_path: __dirname + '/../../logs/',
    log_file_permissions: 644,
    log_date_format: 'Y-m-d H:i:s',
    log_file_extension: '',
    /* session and cookie */
    session: {
        name: '__np__',
        secret: 'hello world',
        resave: true,
        saveUninitialized: true,
        user_sess_name: '__USER_SESSION__',
        test: true,
        test_uri: '/session',
        session_use_connection: true,
        session_table: 'cms_sessions',
        session_field_id: 'session_id',
        session_field_expires: 'expires',
        session_field_data: 'data'
    },
    cookie: {
        secure: true,
        http_only: false,
        default_domain: '',
        default_path: '/',
        check_expiration_second: 300,
        expiration_second: 3600
    }
};