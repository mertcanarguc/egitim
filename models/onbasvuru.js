const mongoose = require("mongoose")
const Schema = mongoose.Schema

const onbasvuruSchema = new Schema({
	egitim:String,
	adsoyad:String,
	mail:String,
	tel:String,
	createdAt:{
		type:Date,
		default:Date.now
	}
})

module.exports = mongoose.model("Onbasvuru",onbasvuruSchema)