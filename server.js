const express = require('express');
const dotenv = require('dotenv');
const morgan =require('morgan');
const bodyparser = require("body-parser");
const path = require("path");
const connectDB = require('./server/database/connection');
const app = express();
dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 3000;
//const host = '0.0.0.0';
// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

//parse request to body-parser 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));
app.set("view engine","ejs")

// set engine 
//app.set("views",path.resolve(__dirname."views/ejs"))
// set loader
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

app.use('/',require('./server/routers/router'))
//app.listen(8000,()=>{console.log(`Server is running on http://localhost:${PORT}`)});
//app.listen(process.env.PORT || 8000, function(){
  //console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//});
app.listen(PORT, function () {
  console.log('Express server listening on %d, in %s mode', PORT, app.get('env'));
});