var mongoose = require('mongoose');

mongoose.connect('mongodb://flights:*************@ds031628.mongolab.com:31628/flights');


module.exports = mongoose.connection;
