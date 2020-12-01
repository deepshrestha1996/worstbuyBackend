var express = require("express");
var app = express();
var morgan = require("morgan");

var authRoute = require("./controller/auth");
var userRoute = require("./controller/user");
var productRoute = require("./controller/product")();

//load application level middleware
var checkToken = require("./middlewares/checkTicket")
var authenticate = require("./middlewares/authenticate");
var authorize= require("./middlewares/authorize")

var apiRoute= require("./controller/api.route")(authenticate,authorize)

var pug = require("pug");
var bodyParser = require("body-parser")// encodes form data
var config = require("./config/index")
var cors = require("cors");


///// calling mongoose.config.js file for db connection is sufficient for db connection
require("./config/db.config")



////////////////set view engine//////////

app.set("view engine", pug);
app.set("views", "views");

/////////////////third party middleware////////////
// app.use(morgan("dev"));
// app.use(bodyParser.urlencoded({
//     extended: false,
// }))
app.use(cors())
app.use(morgan("dev"));
app.use(express.urlencoded({
    extended: false,
}))
app.use(express.json())


//////////////application level middleware/////////////////
// app.use(function (req, res, next) {

//    console.log("i am application level middleware")
//    next();

// })
// app.use (function(req, res , next){
//     console.log("i am application level middleware");
//     next();
// })
//call inbuilt controller/router


// var userRoute= require ("./controller/user");
// var notification= require ("./controller/notification");
// var comment= require ("./controller/comment");




///////////////////routing level middleware///////////

app.use("/api", apiRoute)
app.use("/auth", authRoute)
app.use("/user", authenticate, userRoute)
app.use("/product", authenticate, productRoute)


//whenever express.router() is used is config block, it is routing level middleware
/////////////////////////////////////////////////////////
///////////////////express inbuilt middleware////////////
app.use("/img", express.static("files"))

///////////////application level middleware as an 404 handler/////////////////
app.use(function (req, res, next) {
    console.log("i am inside applicaion level middleware:")
    next({
        message: "request url not registered",
        status: 404
    })
});

///////////////////error handling middleware has 4 argument/////////////////
// next with arg to call error handling middleware
app.use(function (err, req, res, next) {

    //err or 1st arg is for errors
    console.log("error handling middleware", err)
    var status = err.status || 400
    var message = err.message || "something went wrong"
    res.status(status).json({
        message: message,
        status: status
    })
})


// app.use(function(req, res, next){
//     console.log("i am second application level middleware>>>> ", req.myName);
//     if(req.myName){
//         req.myName="value changed";
//     }
//     res.json({
//         message: "hello i am in 2nd application level middleware"
//     })
// });


app.listen(config.port, function (err, done) {

    if (err) {
        console.log("error in listening");
    }
    else {
        console.log("server listening at port:", + config.port)

    }
})