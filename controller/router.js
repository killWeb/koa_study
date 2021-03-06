const KoaRouter = require('koa-router'); // 路由模块
const router = new KoaRouter();
const page_router = require('./module/page_router.js');
const logic_router = require('./module/logic_router.js');
const routerList = [...page_router, ...logic_router];

module.exports = (app) => {
    for (let routerObj of routerList) {
        switch (routerObj.type) {
            case 'GET':
                router.get(routerObj.url, routerObj.handler);
                break;
            case 'POST':
                router.post(routerObj.url, routerObj.handler);
                break;
        }
    }

    // 路由集合页
    router.get('/views/router_list.paper', async (ctx, next) => {
        const u_id = ctx.session.u_id || 0;
        const logined = u_id === 'test_koa_session';
        await ctx.render('index', {
            routerList: page_router,
            logined
        });
        await next();
    });
    app.use(router.routes()).use(router.allowedMethods());
};
