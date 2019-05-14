'use strict'
const logger = require('../utils/logger');
const deliStore = require('../models/deli-store');
const uuid = require('uuid');
const JsonStore = require('./json-store');

const commentsStore = {
storecomments: new JsonStore('models/comments.json',{comments: [] }),
 collection:'comments',


getComments() {
return this.storecomments.findBy(this.collection);
},


  addComments(comments) {
    this.storecomments.add(this.collection, comments);
  },
};
module.exports = commentsStore;