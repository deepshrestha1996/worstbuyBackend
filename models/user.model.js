var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({
    // schema defination for user

    firstName: {
        type: String,
        unique: false,
    },
    lastName: {
        type: String,    },
    emailAddress: {
        type: String,
        unique: true,
        sparse: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    city: {
        type: String
    },
    street: {
        type: String
    },
    zip: {
        type: Number
    },
    phoneNumber: {
        type: Number
    },
    dob: {
        type: Date
    },
    role: {
        type: Number,
        enum: [1, 2, 3],// 1 for admin 2 for normal user 3 for visitor
        default: 2
    },
}, {
        timestamps: true,
    })

// mongoose model
var userModel = mongoose.model("users", userSchema)

module.exports = userModel;