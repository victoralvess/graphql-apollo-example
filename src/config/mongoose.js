const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/graphql_apollo_dev');

module.exports = mongoose;