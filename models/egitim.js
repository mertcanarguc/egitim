const mongoose = require("mongoose");
const Schema = mongoose.Schema

const egitimSchema = new Schema({
	ad:String,
	aciklama:String,
	egitmen:String,
	kategori:String,
	katid:String,
	foto:String,
	kapak:String,
	kacv:Number,
	saat:Number,
	hafta:Number,
	ay:Number,
	tutar:Number,
	durum:Number,
	cretedAt:{
		type:Date,
		default:Date.now
	}
})

module.exports = mongoose.model("Egitim",egitimSchema)