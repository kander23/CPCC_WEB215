var mongoose = require('mongoose');

mongoose.connect('mongodb://flights:Windstream1999!@ds031628.mongolab.com:31628/flights');


module.exports = mongoose.connection;