var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken")
var config = require("./../config/index")
var passwordHash = require("password-hash")
var mapUserReq = require("./../helpers/map_user_req");



// var mongodb = require("mongodb");
// var MongoClient = mongodb.MongoClient;

// var dbUrl = "mongodb://127.0.0.1:27017";
// var dbName = "project123";
// var colName = "users";

// call models
var userModel = require("./../models/user.model")

router.get("/", function (req, res, next) {

    res.json({
        message: "hello i am inside auth get."
    })
});
router.post("/login", function (req, res, next) {
    console.log("post req here:", req.body)
    // data is here now proceed with database
    //// using mongodb
    // MongoClient.connect(dbUrl, function (err, client) {

    //     if (err) {
    //         console.log("error in db connection")
    //         next(err);
    //     }
    //     else {
    //         console.log("db connection success")
    //         var db = client.db(dbName)

    //         db.collection(colName).find({
    //             username: req.body.username,
    //             password: req.body.password
    //         }).toArray(function (err, done) {
    //             if (err) {
    //                 return next(err);
    //             }
    //             res.status(200).json(done);
    //         })
    //     }
    // })

    // using mongoose
    userModel.findOne({
        username: req.body.username
    })
        // .sort({ })//sorts in ascending or descending order
        // .limit(2)// shows only 2 values
        // .skip(1)// skips values. in this case skips first value
        .exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (user) {

                var matched = passwordHash.verify(req.body.password, user.password);
                if (matched) {
                    var token = jwt.sign({ _id: user._id }, config.jwtSecret);
                    res.json({
                        user: user,
                        token: token
                    })
                }else{
                    next({
                        message: "invalid login credential"
                    })
                }

            } else {
                next({
                    message: "invalid login credential"
                })
            }
        })
});
router.post("/register", function (req, res, next) {
    console.log("post req here at register: ", req.body)
    //data is here proceed with data base
    //  using mongodb   
    // MongoClient.connect(dbUrl, function (err, client) {
    //     if (err) {
    //         console.log("db error: connection failed")
    //         next(err);
    //     }
    //     else {
    //         console.log("db connection success")
    //         var db = client.db(dbName);
    //         //  prepare object
    //         // var obj = {
    //         //     fullName: req.body.name,
    //         //     emailAddress: req.body.email,
    //         //     username: req.body.username,
    //         //     password: req.body.password
    //         // }

    //         db.collection(colName).insert(req.body, function (err, done) {

    //             if (err) {
    //                 next(err);
    //             }
    //             else {
    //                 res.json(done)

    //             }
    //         });
    //     }

    // })
    //using mongoose
    var newUser = new userModel({});
    var newMapUser= mapUserReq(newUser, req.body);

    newMapUser.save()
        .then(function (data) {
            res.json(data)
        })
        .catch(function (err) {
            next(err); 
        })


});
router.post("/forgotPassword", function (req, res, next) {


})

module.exports = router; 