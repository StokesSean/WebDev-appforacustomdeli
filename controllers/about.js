'use strict';
const logger = require('../utils/logger');
const commentsStore = require('../models/comments.js');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const JsonStore = require('../models/json-store');

const about = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    logger.info('about rendering');
     if (loggedInUser) {
    const viewData = {
      comments:commentsStore.getComments(),
      title: 'About our deli 1',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('about', viewData );
  } 
   else response.redirect('/');
},
  addComment(request, response) {
const loggedInUser = accounts.getCurrentUser(request);
    const newComments = {
      id:uuid(),
      userid: loggedInUser.id,
      Comment: request.body.comment,
      firstname: loggedInUser.firstName,
    };
    commentsStore.addComments(newComments);
    response.redirect('/about');
  },
};

module.exports = about;
