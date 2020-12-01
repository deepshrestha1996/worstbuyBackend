var productModel = require("./../model/product.model")
var mapProduct = require("./../../../helpers/map_product")
//purely database query building place
function fetch(condition) {
    return new Promise(function (resolve, reject) {
        productModel.findById(condition)
            .exec(function (err, product) {
                if (err) {
                    reject(err)
                } else {
                    resolve(product);
                }
            })
    })

}
function insert(data, file) {
    return new Promise(function (resolve, reject) {
        var newProduct = new productModel
        var newMapProduct = mapProduct(newProduct, data)
        if (file)
            newMapProduct = file.filename
        if (file.mimetype) {
            var mimetype = file.mimetype;
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
        } else {
            newMapProduct.save()
                .then(function (data) {
                    res.json(data)
                })
                .catch(function (err) {
                    next(err)
                })
        }

        newMapProduct.save(function (err, solved) {
            if (err) {
                reject(err)
            }
            else {
                resolve(solved)
            }
        })
    })

}
function remove(id) {
    return new Promise(function (resolve, reject) {
        productModel.findByIdAndRemove(id)
            .exec(function (err, removed) {
                if (err) {
                    reject(err)
                } else {
                    resolve(removed)
                }
            })
    })


}

function update(id, data, file) {
    return new Promise(function (resolve, reject) {
        productModel.findById(id)
            .exec(function (err, product) {
                if (err) {
                    reject(err)
                }
                if (product) {
                    var oldImage = product.image;
                    var updateMapProduct = mapProduct(product, data)
                    if (file) {
                        product.image = file.filename
                    }
                    if (file.mimetype) {
                        var mimetype = file.mimetype;
                        var image = mimetype.split("/")[0]

                    }
                    if (image != "image") {
                        fs.unlink("./files/images/" + file.filename, function (err, done) {
                            if (err) {
                                console.log("error in removing previous file", err)
                            }
                            else {
                                console.log("success in removing previous file")
                            }
                        })
                        return next({
                            message: "you uploaded invalid file format"
                        })

                    }
                    else {
                        fs.unlink("./files/images/" + oldImage, function (err, done) {
                            if (err) {
                                console.log("err in removing previous file", err)
                            }
                            else {
                                console.log("success in removing previous file")
                            }
                        })
                        updateMapProduct.save(function (err, updated) {
                            if (err) {
                                reject(err)
                            }
                            else {
                                resolve(updated)
                            }
                        })
                    }

                }
                else {
                    reject({
                        message: "product not found"
                    })
                }
            })
    })

}


module.exports = {
    get: fetch,
    update: update,
    insert: insert,
    remove: remove

}