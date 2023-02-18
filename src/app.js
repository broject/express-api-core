/* prepare system */
const { __esModule } = require("@babel/preset-env");
var _PORT = process.env.port || 8080;
var _ENV = process.env.NODE_ENV || 'development';
console.log('*NODE_ENV:', _ENV, __esModule, ';');/*> NODE_ENV=production node /home/user/services/app.js*/

var _DATETIME = new Date().toJSON().replace(/T/, ' ').replace(/\..+/, '');
console.log('*DateTime:', _DATETIME, ';');

var v8 = require('v8');
var v8_heap_tas = v8.getHeapStatistics().total_available_size;
console.log('*HeapStatistics:', (v8_heap_tas / 1024 / 1024).toFixed(2), 'MB;');

var os = require('os');
var fs = require('fs');
var cert_crt = __dirname + '/../private/ssls/certificate.crt';
var cert_key = __dirname + '/../private/ssls/private.key';
var cert_ca = __dirname + '/../private/ssls/ca_bundle.crt';
if (_ENV !== 'production') {
    var host_address = 'localhost';
    var networkInterfaces = os.networkInterfaces();
    Object.keys(networkInterfaces).forEach(function (ni) {
        networkInterfaces[ni].forEach(function (item) {
            if ('IPv4' !== item.family || item.internal !== false) return;
            host_address = item.address;
        });
    });
    if (host_address.startsWith('192.168.') || host_address.startsWith('127.0.')) { host_address = 'localhost'; }
    cert_crt = __dirname + '/../private/ssls/' + host_address + '/server.crt';
    cert_key = __dirname + '/../private/ssls/' + host_address + '/server.key';
    cert_ca = 'not use yet in development';
}
console.log('*SSL_Certificate:', cert_crt, fs.existsSync(cert_crt), ';');

/* init app server */
const configs = require('./configs');
var options = {
    // pauseOnConnect: true,
    // requestCert: true,
    // rejectUnauthorized: false
}
if (configs.use_ssl) {
    options['cert'] = fs.readFileSync(cert_crt, 'utf8');
    options['key'] = fs.readFileSync(cert_key, 'utf8');
    if (_ENV == 'production') {
        options['ca'] = fs.readFileSync(cert_ca, 'utf8');
    }
}
options['use_ssl'] = configs.use_ssl;
console.log('*NodeJS.Process:', process.pid, 'is working...');

if (configs.is_local_test) {
    console.log('*TEST*');
    console.log('');
    const test = require('./tests');
    test.default(options);
} else {
    const core = require('./core');
    const server = core.CreateServer(__dirname, options);
    core.InitModules(configs.active_modules, '/modules');

    /* listening main process */
    server.listen(_PORT, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('*' + (options.use_ssl ? 'https' : 'http') + '://' + host + ':' + port + '/', server.address().family, ';');
        console.log('');
    });
    // process.on('uncaughtException', err => {
    //     console.error('There was an uncaught error', err);
    //     process.exit(1); // mandatory (as per the Node.js docs)
    // });   
}