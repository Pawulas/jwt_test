const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');

const passportConf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelper');
const UsersController = require('../controllers/users');
const passportLocal = passport.authenticate('local', { session: false });
const passportJwt = passport.authenticate('jwt', { session: false });

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signup);

router.route('/signin')
  .post(passportLocal, validateBody(schemas.authSchema), UsersController.signin);

router.route('/secret')
  .get(passportJwt, UsersController.secret);

module.exports = router;