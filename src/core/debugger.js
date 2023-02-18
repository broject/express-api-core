export function AppDebugger(req, res, next) {
    if (res.headersSent) {
        console.log('*App Debugging:::HeadersSent is True', req.method, '-', req.originalUrl);
    } else {
        console.log('*App Debugging:::HeadersSent is False', req.method, '-', req.originalUrl);
    }
    next();
}

export function AppLogger(req, res, next) {
    next();
}