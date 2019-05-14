'use strict';

const logger = require('../utils/logger');
const deliStore = require('../models/deli-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const pictureStore = require('../models/picture-store.js');

const dashboard = {
index(request,response){
logger.info('dashboard rendering');
const loggedInUser = accounts.getCurrentUser(request);

if(loggedInUser){
const deliitemcollections  = deliStore.getUserDelis(loggedInUser.id) 
let totalitems = 0;
for (let i in deliitemcollections ) {
totalitems = totalitems + deliitemcollections[i].food.length;
}



const viewData = {
title: 'Deli Menu',
album: pictureStore.getAlbum(loggedInUser.id),
deli:deliStore.getUserDelis(loggedInUser.id),
totalitems:totalitems,


fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
}
logger.info('about to render', viewData.deli,'the number of items in this deli is');
response.render('dashboard',viewData);
}
else response.redirect('/');
},

deletedeli(request, response) {
const deliid = request.params.id;
logger.debug('Deleting item category from the deli ${deliid}');
deliStore.removedeli(deliid);
response.redirect('/dashboard');
},
adddeli(request,response) {
const loggedInUser = accounts.getCurrentUser(request);
const newDeli = {
id: uuid(),
userid: loggedInUser.id,
title: request.body.title,
food:[],
};
logger.debug('Creating a new deli',newDeli);
deliStore.adddeli(newDeli);
response.redirect('/dashboard');
},
  uploadPicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.addPicture(loggedInUser.id, request.body.title, request.files.picture, function () {
      response.redirect('/dashboard');
    });
  },
  deleteAllPictures(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deleteAllPictures(loggedInUser.id);
    response.redirect('/dashboard');
  },

  deletePicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deletePicture(loggedInUser.id, request.query.img);
    response.redirect('/dashboard');
  },
};



module.exports = dashboard;
