const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

router.render = (req, res) => {

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
  '/:resource/metadata?type=:type&version=': '/metadata?id=:resource&type=:type'
}))
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})