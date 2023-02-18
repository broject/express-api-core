export default async (router) => {
    router.get('/', (req, res, next) => {
        res.end('hello home/index');
    });
};