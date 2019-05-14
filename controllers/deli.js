'use strict';
const accounts = require ('./accounts.js');

const logger = require('../utils/logger');
const deliStore = require('../models/deli-store');
const uuid = require('uuid');



const deli = {

index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);  
    const deliid = request.params.id;
    logger.debug('deli id = ', deliid);
    if (loggedInUser) {
    const viewData = {
      title: 'deliid',
      deli: deliStore.getDeli(deliid),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('deli', viewData);
    }
    else response.redirect('/');
},
deleteFood(request,response) {
const  deliid = request.params.id;
const foodid = request.params.foodid;
logger.debug ('Deleting item from menu  ${foodid} from deli ${deliid}');
deliStore.removeFood(deliid,foodid);
response.redirect('/deli/' + deliid);
},
addfoods(request,response) {
const deliid = request.params.id;
const deli = deliStore.getDeli(deliid);
const newFood = {
id: uuid(),
item: request.body.item,
price: request.body.price,
};
deliStore.addfoods(deliid,newFood);
response.redirect('/deli/' + deliid);
},
updatefood(request,response){
const deliid = request.params.id;
const foodid = request.params.foodid;
logger.debug ("updateing item" + foodid);
const alterfood = {
item:request.body.item,
price:request.body.price,

};
deliStore.editfood(deliid,foodid,alterfood);
response.redirect('/deli/'+ deliid);
},
};

module.exports = deli;