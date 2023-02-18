export function AppErrorHandler(err, req, res, next) {
    console.log('*App ErrorHandling:::HeadersSent is', res.headersSent, err.name, '-', err.message);
    console.log(err.stack);
    next();
}