const restify = require('restify')

const server = restify.createServer()
server.use(restify.plugins.bodyParser())

function hello(req, res, next) {
  res.send('hello, this is a simple API.')
}

function respondFetchUser(req, res, next) {
  res.contentType = 'json'

  res.send({
    name: 'TJ',
    age: 28,
    address: 'Tokyo'
  })
  next()
}

function respondPostUser(req, res, next) {
  const user = req.body
  res.contentType = 'json'
  res.send(
    user
  )
}

server.get('/', hello)
server.get('/users/:id', respondFetchUser)
server.post('/users/:id', respondPostUser)

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url)
})
