var productController = require("./../controller/product.controller")

var router = require("express").Router()
var innerMulter= require("./../../../middlewares/innerMulter")('image');
router.route("/")
    .get(productController.get)
    .post(innerMulter.single("image"), productController.insert)

router.route("/:id")
    .get(productController.getById)
    .put(innerMulter.single("image"), productController.update)
    .delete(productController.remove)

module.exports = router ;