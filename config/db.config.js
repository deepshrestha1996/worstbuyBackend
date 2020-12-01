var mongoose = require("mongoose");
var config= require("./index");
var dbUrl= config.dbUrl+"/" + config.dbName
// mongodb://localhost:27017/[dbname]

mongoose.connect(dbUrl, function(err, client){
    if(err){
        console.log("error in connection database>" ,err)
    }
    else{
        console.log("db connection success")
    }

})