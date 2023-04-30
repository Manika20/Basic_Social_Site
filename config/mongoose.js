//require the library
const mongoose = require('mongoose');
const env = require('../config/environment');
// set connection
mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);
//mongoose.connect('mongodb://localhost/contacts_list_db');
//acquire the connection
const db = mongoose.connection;
//check if error in connecting
db.on('error',console.error.bind(console,'error connecting to db'));
//else print successfull
db.once('open',function()
{
    console.log('successfully connected to database');
});
