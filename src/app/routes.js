const express = require('express');
const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const authMiddleware = require('./middleware/auth');
const guessMiddleware = require('./middleware/guess');

const routes = express.Router();

routes.use('/', (req, res, next) => {
  res.locals.flashSuccess = req.flash('success');
  res.locals.flashError = req.flash('error');
  next();
});
routes.get('/', guessMiddleware, authController.signin);
routes.get('/signup', guessMiddleware, authController.signup);
routes.get('/signout', authController.signout);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

routes.use('/app', authMiddleware);
routes.get('/app/dashboard', dashboardController.index);


module.exports = routes;
