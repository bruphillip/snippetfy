const express = require('express');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./app/routes');
const sessionConfig = require('./config/session');

const app = express();

app.use(express.static(path.resolve('src', 'app', 'public')));
require('./nunjucks')(app);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session(sessionConfig));
app.use(flash());

app.use('/',routes);
app.listen(3000);
