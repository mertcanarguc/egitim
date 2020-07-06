const mongoose = require("mongoose");
const Schema = mongoose.Schema

const linkSchema = new Schema({
	baslik:String,
	link:String,
	createdAt:{
		type:Date,
		default:Date.now
	}
})

module.exports = mongoose.model("Link",linkSchema)