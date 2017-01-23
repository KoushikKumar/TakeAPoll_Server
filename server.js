const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require("cors");

//app setup
dotenv.config();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type:'*/*'}));
router(app);

//DB connect
mongoose.connect(process.env.MONGO_URI, function(db) {
    var server = app.listen(process.env.PORT, function(){
       var port = server.address().port;
       console.log("listening to "+port);
    });
});