export default async (router) => {
    router.get('/login', (req, res, next) => {
        res.end('hello home/login');
    });
};