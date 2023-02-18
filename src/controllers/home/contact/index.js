export default async (router) => {
    router.get('/', (req, res, next) => {
        res.end('hello home/contact/index');
    });

    router.get('/about', (req, res, next) => {
        res.end('hello home/contact/about');
    });
}