const mongoose = require("mongoose")
const Schema = mongoose.Schema

const sssSchema = new Schema({
	soru:String,
	cevap:String,
	createdAt:{
		type:Date,
		default:Date.now
	}
})

module.exports = mongoose.model("Sss",sssSchema)