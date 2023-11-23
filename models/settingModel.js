const mongoose = require("mongoose")

const settingSchema = new mongoose.Schema({
    username : {type:String, required: true},
    password : {type:String, required: true},
    role : {type:String, required: true},
})

const settingModel = mongoose.model('settings', settingSchema)

module.exports = settingModel