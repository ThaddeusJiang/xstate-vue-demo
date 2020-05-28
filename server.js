const restify = require('restify');

const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.use(function crossOrigin(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  return next();
});

function hello(req, res, next) {
  res.send('hello, this is a simple API.');
}

let user = {
  name: 'TJ',
  age: 28,
  address: 'Tokyo',
};

function respondFetchUser(req, res, next) {
  setTimeout(() => {
    console.log(user);
    res.contentType = 'json';
    res.send(user);
  }, 1000);

  next();
}

function respondPostUser(req, res, next) {
  setTimeout(() => {
    const data = req.body;
    if (typeof data.age === 'number') {
      user = data;
      console.log(user);
      res.contentType = 'json';
      res.send(user);
    } else {
      // FIXME:
      res.send(400, { error: new Error('the age must be a number.') });
    }
  }, 1000);

  next();
}

server.get('/', hello);
server.get('/api/users/:id', respondFetchUser);
server.post('/api/users/:id', respondPostUser);

server.listen(9090, function () {
  console.log('%s listening at %s', server.name, server.url);
});
