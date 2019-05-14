'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const deli = require('./controllers/deli.js');
const accounts = require ('./controllers/accounts.js');



router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);

router.get('/dashboard', dashboard.index);
router.get('/about', about.index);

router.get('/dashboard/deletedeli/:id', dashboard.deletedeli);
router.post('/dashboard/adddeli',dashboard.adddeli);
router.post('/about/addComment', about.addComment);


router.get('/deli/:id', deli.index);
router.get('/deli/:id/deleteFood/:foodid', deli.deleteFood);
router.post('/deli/:id/addfoods',deli.addfoods);
router.post('/deli/:id/updatefood/:foodid',deli.updatefood);
router.post('/dashboard/uploadpicture', dashboard.uploadPicture);
router.get('/dashboard/deleteallpictures', dashboard.deleteAllPictures);
router.get('/dashboard/deletepicture', dashboard.deletePicture);

module.exports = router;

