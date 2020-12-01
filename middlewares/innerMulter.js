var multer = require('multer');
module.exports = function (filterType) {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './files/images/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    function a(req, file, cb) {
        var mimetype = file.mimetype;
        var image = mimetype.split('/')[0];
        if (image == filterType) {
            cb(null, true);
        } else {
            req.invalidFileFormat = true;
            cb(null, false);
        }

    }
    var upload = multer({ storage: storage, fileFilter: a });

    return upload;
}