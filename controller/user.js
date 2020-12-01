var router = require("express").Router();
var mongodb = require("mongodb");
// var MongoClient = mongodb.MongoClient;

// var dbUrl = "mongodb://127.0.0.1:27017";
// var dbName = "project123";
// var colName = "users";
// var oId = mongodb.ObjectID;
var userModel = require("./../models/user.model")
var mapUserReq = require("./../helpers/map_user_req");

router.route("/")
    .get(function (req, res, next) {
        // console.log("req query:", req.query)
        // res.json(req.query)
        // MongoClient.connect(dbUrl, function (err, client) {

        //     if (err) {
        //         return next(err);
        //     }
        //     else {
        //         var db = client.db(dbName)
        //         db.collection(colName).find({}).toArray(function (err, done) {
        //             if (err) {
        //                 return next(err)
        //             }
        //             else {
        //                 res.json(done);
        //             }
        //         })
        //     }
        // })
        userModel.find({}, function (err, done) {
            if (err) {
                return next(err)
            }
            res.status(200).json(done)
        })

    })
    .post(function (req, rea, next) {

    })
    .put(function (req, rea, next) {

    })
    .delete(function (req, rea, next) {

    })

router.route("/:id")
    .get(function (req, res, next) {
        var id = req.params.id;
        userModel.findById(id).exec(function (err, done) {
            if (err) {
                return next(err)
            }
            res.json({
                done
            })
        })

    })

    .put(function (req, res, next) {
        // for update

        // update
        var id = req.params.id;
        userModel.findById(id).exec(function (err, user) {
            if (err) {
                return next(err)
            }
            if (user) {
                var updateMapUser = mapUserReq(user, req.body)
                updateMapUser.save(function (err, updated) {
                    if (err) {
                        return next(err)
                    }
                    res.status(200).json(updated);
                })
            } else {
                next({
                    message: "user not found"
                })
            }
        })

    })
    .delete(function (req, res, next) {
        var id = req.params.id
        userModel.findById(id).exec(function (err, user) {
            if (err) {
                return next(err)
            }
            if (user) {
                user.remove(function (err, done) {
                    if (err) {
                        return next(err)
                    }
                    res.status(200).json({
                        message: "user deleted"
                    })

                })

            }
            else {
                next({
                    message: "user not found"
                })
            }

        })

    })


module.exports = router;