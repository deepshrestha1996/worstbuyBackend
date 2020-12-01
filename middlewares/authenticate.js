var jwt = require("jsonwebtoken");
var config = require("./../config/index")
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

module.exports = function (req, res, next) {
    var token;

    if (req.headers.token) {
        token = req.headers.token;
    }
    if (req.headers["x-access-token"]) {
        token = req.headers["x-access-token"]
    }
    if (req.headers["authorization"]) {
        token = req.headers["authorization"]
    }
    if(req.query.token){
        token=req.query.token;
        
    }
    if (token) {
        jwt.verify(token, config.jwtSecret, function (err, decoded) {
            if (err) {
                console.log("err is here", err)
                return next(err)
            }
            console.log("token verified", decoded);
            MongoClient.connect(config.dbUrl, function (err, client) {
                if (err) {

                    return next(err);
                }
                var db = client.db(config.dbName);
                db.collection("users").find({ _id: new mongodb.ObjectID(decoded._id) }).toArray(function (err, user) {
                    if (err) {
                        return next(err)
                    }
                    if (user.length) {
                        req.loggedInUser = user[0];
                        next();
                    } else {
                        next({
                            message: "user already removed from system",
                            status: 400
                        })
                    }
                })


            })
        })
    }
    else {
        next({
            message: "token not provided",
            status: 400
        })
    }
}
