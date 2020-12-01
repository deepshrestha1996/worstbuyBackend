var mongoose = require("mongoose")
var Schema = mongoose.Schema
var supplierSchema= new Schema({
    supplierName: String,
    supplierAddress: String,
    contactDetails:{
        email: String,
        phoneNumber: Number,

    }
})

var productSchema = new Schema({
    productId: {
        type: Number,
    },
    productName:{
        type: String,
    },
    quantity:{
        type: Number,
    },
    price:{
        type: Number
    },
    brand:{
        type: String
    },
    image:{
        type: String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    status:{
        type: String,
        enum:["available", "sold", "out of stock"],
        default: "available"
    },
    supplier: supplierSchema,
    buyer:{
        type: String,
    },
    tags:[String],
    quality: {
        type: String,
        enum:["low", "medium", "high"],
        default: "medium",
    }




}, {
        timestamps: true,
    });

module.exports = mongoose.model("product", productSchema);