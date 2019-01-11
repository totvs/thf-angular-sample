const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

router.render = (req, res) => {
  let expand, data = res.locals.data;

  if (req.url.includes('_expand')) {
    expand = req.url.replace(req.path, '').substring(1).split('&');
    expand.forEach(element => {
      
      if (element.includes('_expand')) {
        let field = element.split('=')[1];
       
        let expandItems = object => {
          if (object) {
            let fields = Object.keys(object[field]);
            fields.forEach(f => {
              object[`${field}${f.replace(/\b\w/g, l => l.toUpperCase())}`] = object[field][f];
            });
            delete object[field];
          }
        }
       
        if (data instanceof Array) {
          data.forEach(item => {
            expandItems(item)
          });
        } else {
          expandItems(data);
        }
      }
    });
  }

  if (req.method == 'GET' && req.path.endsWith('/metadata')) {
    if (res.locals.data.length > 0) {
      res.jsonp(res.locals.data[0])
    } else {
      res.jsonp({})
    }
  } else if (req.method === 'GET' && req.route.path === '/') {
    res.jsonp({
      hasNext: false,
      items: res.locals.data
    });
  } else {
      res.jsonp(res.locals.data);
  }
}

server.use(middlewares);
server.use(jsonServer.rewriter({
  '/jobschedulers/*': '/$1',
  '/:resource/metadata?type=:type&version=:version': '/metadata?id=:resource&type=:type&version=:version',
  '/:resource/metadata?type=:type&version=': '/metadata?id=:resource&type=:type',
  '/orders': '/orders?_expand=customer',
  '/orders?page=:page&pageSize=:pageSize': '/orders?_expand=customer'
}))
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})