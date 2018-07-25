const express = require('express');
const bodyParser = require('body-parser');

const app = express();

require('./nunjucks')(app)

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000);
