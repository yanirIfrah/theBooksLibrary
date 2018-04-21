const jsonServer = require('json-server');
const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.static(__dirname +'/dist');

cont path = require('path');

app.get('/*', function(req,res) {
res.sandFile(path.join(__dirname + /dist/index.html'));})

app.use(middlewares);
app.use(router);
app.listen(3000, () => {
  console.log('JSON Server is running');
})

