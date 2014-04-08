var mongoose = require('mongoose');

mongoose.connect('mongodb://user:pass@ds031628.mongolab.com:31628/flights');


module.exports = mongoose.connection;
