const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Connect to database
mongoose.createConnection('mongodb://<dbuser>:<dbpassword>@ds251727.mlab.com:51727/todo');

//Create a schema
const Record = new Schema({
  email: String
});

//Create a model
const NewRecord = mongoose.model('NewRecord', Record);

module.exports = NewRecord;
