'use strict';
const accounts = require ('./accounts.js');

const logger = require('../utils/logger');
const deliStore= require('../models/deli-store.js');

const start = {
 index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    logger.info('start rendering');
    if (loggedInUser) {
const delicollection = deliStore.getAllDelis();
let totaldelis= 0;
for (let i in delicollection) {
totaldelis = totaldelis + delicollection[i].food.length
}
    const viewData = {
      title: 'Welcome to Playlist 1',
  totalDelis: delicollection.length,
  totalitems: totaldelis,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
  
    response.render('start', viewData);
    }
    else response.redirect('/');
},
};

module.exports = start;
