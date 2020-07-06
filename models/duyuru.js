const mongoose = require("mongoose");
const Schema = mongoose.Schema

const duyuruSchema = new Schema({
	duyuru:String,
	egitim:String,
	egitimad:String,
	link:String,
	createdAt:{
		type:Date,
		default:Date.now
	}
})

module.exports = mongoose.model("Duyuru",duyuruSchema)