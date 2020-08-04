const Koa = require('koa');
const path = require('path');
const nunjucks = require('koa-nunjucks-2'); // 模板引擎
const bodyParser = require('koa-bodyparser'); // 处理 post 请求数据
const router = require('./router.js');
const server = require('koa-static'); // 静态文件
const logger = require('koa-logger'); // log 日志
const moment = require('moment');

// 若项目中使用了不下一种模板引擎 如 swig ejs nunjucks 等等 ，可引入 co-view 组织模板引擎解决

const app = new Koa();

app.use(nunjucks({ // 为 app.context 提供一个 render 方法
    ext: 'html',
    path: path.join(__dirname, 'views'),
    nunjucksConfig: {
        trimBlocks: true // 开启转义 防Xss
    }
}));

app.use(bodyParser());
router(app);
app.use(server('.'));
app.use(logger((str) => {
    console.log(`${moment().format('YYYY-MM-DD hh:mm:ss')}${str}`);
}));

app.listen(9978, () => {
    console.log(`Local serve is running at http://localhost:9978/`);
});
