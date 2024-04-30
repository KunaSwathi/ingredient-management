const { default: mongoose } = require("mongoose")

//schema
const schemaData = mongoose.Schema({
    name :{
        type : "String",
        required : true
    },
    quantity :{
        type : "String",
        required : true
    },
    unit :{
        type : "String",
        required : true
    },
    note :{
        type : "String",
        required : true
    }

},{
    timestamps :true
})

module.exports = mongoose.model("UserModel", schemaData)