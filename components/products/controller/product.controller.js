var productQuery = require("./../query/product.query")

//// this is place to put busimess logics

function get(req, res, next) {
    var condition = {}
    if (req.loggedInUser.role != 1) {
        condition.user = req.loggedInuser._id;
    }
    productQuery.get(condition)
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (err) {
            next(err)
        })
}
function getById(req, res, next) {
    var condition = { _id: req.params.id }
    productQuery.get(condition)
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (err) {
            next(err)
        })
}
function insert(req, res, next) {
    var reqData = req.body;
    reqData.user = req.loggedInuser._id
    var reqFile = req.file;

    productQuery.insert(reqData, reqFile)
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (err) {
            next(err);
        })
}
function update(req, res, next) {
    var reqData = req.body;
    var reqFile= req.file
    productQuery.update(req.params.id, reqData, reqFile)
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (err) {
            next(err)
        })

}
function remove(req, res, next) {

    productQuery.remove(req.params.id)
        .then(function (data) {
            res.status(200).json(data)
        })
        .catch(function (err) {
            next(err)
        })
}

module.exports = {
    get: get,
    getById: getById,
    update: update,
    insert: insert,
    remove: remove
}
