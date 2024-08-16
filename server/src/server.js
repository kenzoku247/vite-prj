require('module-alias/register');
const mongoose = require('mongoose');
const path = require('path');
require("dotenv").config({ path: '.env' })
const app = require('./app');

mongoose.connect(process.env.DATABASE);

mongoose.connection.on('error', (error) => {
    console.log(
        `1. 🔥 Common Error caused issue → : check your .env file first and add your mongodb url`
    );
    console.error(`2. 🚫 Error → : ${error.message}`);
});

app.set('port', process.env.PORT || 8888);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → On PORT : ${server.address().port}`);
});
