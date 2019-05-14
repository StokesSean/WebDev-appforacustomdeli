
'use strict';
const _ = require('lodash');
const JsonStore = require('./json-store');

const deliStore = {
store: new JsonStore('models/deli-store.json',{deliCollection: [] }),
 collection:'deliCollection',

 getAllDelis() {
    return this.store.findAll(this.collection);
},
getDeli(id) {
return this.store.findOneBy(this.collection, {id: id});
},
adddeli(deli){
this.store.add(this.collection, deli);
},
removedeli(id){
const deli= this.getDeli(id);
this.store.remove(this.collection, deli);
},
removeAlldelis(){
this.store.removeAll(this.collection);
},
addfoods(id, food){
const deli = this.getDeli(id);
deli.food.push(food);
},
removeFood(id, foodid) {
    const deli = this.getDeli(id);
    _.remove(deli.food, { id: foodid });
},
editfood(id,foodid,foodDetails){
const deli= this.getDeli(id);
const food = deli.food;
const thepos = food.findIndex(field=> field.id === foodid);
food[thepos].item=foodDetails.item;
food[thepos].price=foodDetails.price;

},
 getUserDelis(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = deliStore;
