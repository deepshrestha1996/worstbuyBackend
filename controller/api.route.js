var productRoute = require("./../components/products/routes/product.route")


var router = require("express").Router()


module.exports = function (authenticate, authorize, multer) {

    router.use("/product", authenticate, productRoute)


    return router;
}

