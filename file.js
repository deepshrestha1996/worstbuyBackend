var fs = require("fs");



function toWrite(txt, str, cb) {

    fs.writeFile(txt + ".txt", str, function (err, done) {
        if (err) {
            console.log("error in writing");
            cb(err)
        } else {
            console.log("file written");
            cb(null, done);
        }

    });
}
function toRead(text, cb) {
    fs.readFile(text + ".txt", "UTF-8", function (err, done) {

        if (err) {
            console.log("error in reading", err);
            cb (err)
        } else {
            console.log("success in reading:", done);
            cb(null, err)
        }
    })

}

function toRename(old, new1, cb) {
    fs.rename(old + ".txt", new1 + ".txt", function (err, done) {
        if (err) {
            console.log("error in file rename>>", err);
            cb(err);

        } else {
            console.log("success in file rename>>>");
            cb(null, done);
        }

    })

}
module.exports = {
    write: toWrite,
    read: toRead,
    rename: toRename
}

