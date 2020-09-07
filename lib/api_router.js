const Router = require('@koa/router');
const router = new Router();
const routes = require('./router');
const fs = require('fs')
const path = require('path')

router.get('/routes/index',(ctx)=>{
    const abpath = path.resolve('./lib/routes')
    console.log(abpath)
    const files = fs.readdirSync(abpath);
    const result = []
    files.forEach((item) => {
        const stat = fs.lstatSync("./lib/routes/" + item);
        if(stat.isDirectory()==true){
            result.push(item)
        }
            
    })
    ctx.body = {result}
})
router.get('/routes/:name?', (ctx) => {
    const allRoutes = Array.from(routes.stack);
    allRoutes.shift();
    const result = {};
    let counter = 0;

    allRoutes.forEach((i) => {
        const path = i.path;
        const top = path.split('/')[1];

        if (!ctx.params.name || top === ctx.params.name) {
            if (result[top]) {
                result[top].routes.push(path);
            } else {
                result[top] = { routes: [path] };
            }
            counter++;
        }
    });

    ctx.body = { counter, result };
});

module.exports = router;
