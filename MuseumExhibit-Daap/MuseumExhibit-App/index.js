var express = require('./node_modules/express');
var app = express();
const port = 3000
app.use(express.static('src'));
app.use(express.json());
app.get('/', function (req, res) {
  res.render('index.html');
});
app.listen(port, function () {
  console.log('ON 3000...!!!!');
});
