var express = require("express");
var file = require("./file");

var app = express(); // app will be my entire express framework



app.get("/", function (req, res) {
    //callback func exec whenever client send get req to url
    console.log("at get request");
    res.end("hi from  express server")
});
app.get("/write", function (req, res) {
    file.write("deep", "my name is deep", function (err, done) {

        if (err) {
            res.end("error writing");
        }
        else {
            res.end("success in writing");
        }

    })
})
 app.get("/read", function(req,res){
    file.read("deep" ,function(err, done){
        if(err){
            res.end("error in reading");
        }
        else{
            res.end("reading success>>" + res)
        }
    })


 })
app.get("/rename",function(req, res){
    file.rename("deep","deep1", function(err,done){
        if(err){
            res.end("error in renaming");

        }
        else{
            res.end("success in renaming");
        }
    })
})

app.listen(4000, "127.0.0.1", function (err, done) {

    if (err) {
        console.log("server listening failed");

    } else {
        console.log("server listening at port 4000");
    }
})
// middleware is a function that has access to http request object, http response object, and next moddleware placeholder
// middleware always comes in http request response cycle
// the order of middleware is alwaya important

// syntax
// function(req, res, next){

// }

// var a = function (req, res, next){

// }
// app.use(a);

// types of middleware
// 1. application level middleware
// 2. routing level middleware
// 3. error handling middleware
// 4. third party middleware //npm js ma vayeko middleware
// 5. inbuilt middleware // express js sanga vayeko middleware