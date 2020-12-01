var productModel = require("./../components/products/model/product.model")
var mapProduct = require("./../helpers/map_product")
var router = require("express").Router();
var multer = require("multer")
var fs = require("fs")
var path = require("path")
// var upload= multer({dest: "uploads/"});
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./files/images/");

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var upload = multer({ storage: storage })
module.exports = function () {
    router.route("/")
        .get(function (req, res, next) {
            var condition = {}
            if (req.loggedInUser.role != 1) {
                condition.user = req.loggedInUser._id
            }
            productModel.find(condition)
                .sort({
                    id: -1
                })
                .exec(function (err, products) {
                    if (err) {
                        return next(err)
                    }
                    res.status(200).json(products);
                })
        })
        .post(upload.single("images"), function (req, res, next) {
            var newProduct = new productModel({})
            console.log("req.body>>", req.body)
            console.log("req.file>>", req.file)
            var newMapProduct = mapProduct(newProduct, req.body);
            newProduct.user = req.loggedInUser._id;
            if (req.file)
                newProduct.image = req.file.filename
            if (req.file.mimetype) {
                var mimetype = req.file.mimetype;
                var image = mimetype.split("/")[0]
            }
            if (image != "image") {
                fs.unlink("./files/images/" + req.file.filename, function (err, done) {
                    if (err) {
                        return console.log("error in cleaning memory usage")
                    }
                    console.log("success in cleaning memory")

                })
                return next({
                    message: "you uploaded invalid format"
                })
            }
            else {
                newMapProduct.save()
                    .then(function (data) {
                        res.json(data)
                    })
                    .catch(function (err) {
                        next(err)
                    })
            }

            // if (req.file.mimetype == "image/jpeg"
            //     || req.file.mimetype == "image/nef"
            //     || req.file.mimetype == "image/png"
            //     || req.file.mimetype == "image/jpg") {
            //     newMapProduct.save()
            //         .then(function (data) {
            //             res.json(data)
            //         })
            //         .catch(function (err) {
            //             next(err)
            //         })
            // } else {

            //     fs.unlink("./files/images/" + req.file.filename, function(err,done){
            //         if (err){
            //             console.log("error in cleaning memory usage")
            //         }
            //         console.log("success in cleaning memory")

            //     })
            //     return next({
            //         message: "you uploaded invalid format"
            //     })
            // }

        })

    router.route("/search")
        .get(function (req, res, next) {

        })
        .post(function (req, res, next) {
            var condition = {}
            var searchCondition = mapProduct(condition, req.body);
            console.log("search req is>>", condition);
            productModel.find(condition).exec(function (err, product) {
                if (err) {
                    next(err)
                }
                res.json(product)
            })
        })


    router.route("/:id")
        .get(function (req, res, next) {
            var id = req.params.id;
            productModel.findById(id).exec(function (err, product) {

                if (err) {
                    return next(err)
                }
                res.status(200).json(product);
            })
        })
        .put(upload.single("images"), function (req, res, next) {
            console.log("req.file>>", req.file)
            console.log("req.body>>", req.body)

            var id = req.params.id;
            productModel.findById(id).exec(function (err, product) {

                if (err) {
                    return next(err)
                }
                if (product) {
                    var oldImage = product.image;
                    var updateMapProduct = mapProduct(product, req.body)
                    if (req.file) {
                        product.image = req.file.filename
                    }
                    if (req.file.mimetype) {
                        var mimetype = req.file.mimetype
                        var image = mimetype.split("/")[0]
                        console.log("image>>>", image)
                    }
                    if (image != "image") {
                        fs.unlink("./files/images/" + req.file.filename, function (err, done) {
                            if (err) {
                                console.log("error in removing previous file", err)
                            }
                            else {
                                console.log("success in removing previous image")
                            }
                        })
                        return next({
                            message: "you uploaded invalid file format"
                        })
                    }
                    else {
                        fs.unlink("./files/images/" + oldImage, function (err, done) {
                            if (err) {
                                console.log("error in removing previous file", err)
                            }
                            else {
                                console.log("success in removing previous image")
                            }
                        })
                        updateMapProduct.save(function (err, updated) {
                            if (err) {
                                return next(err)
                            }
                            res.status(200).json(updated);
                        })
                    }

                }
                else {
                    next({
                        message: "product not found"
                    })
                }
            })
        })
        .delete(function (req, res, next) {
            var id = req.params.id
            productModel.findById(id).exec(function (err, users) {
                if (err) {
                    return next(err)
                }
                if (users) {
                    users.remove(function (err, done) {
                        if (err) {
                            return next(err)
                        }
                        else {
                            res.json(done)
                        }
                    })
                }
                else {
                    next({
                        message: "user already removed"
                    })
                }
            })
        })

    return router;
}