const mongoose = require("mongoose")
const Schema = mongoose.Schema

const blogSchema = new Schema({
	baslik:String,
	link:String,
	resim:String
})

module.exports = mongoose.model("Blog",blogSchema)