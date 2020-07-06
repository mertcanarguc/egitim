const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const egitmenSchema = new Schema({
	ad:String,
	soyad:String,
	brans:String,
	aciklama:String,
	foto:String,
	createdAt:{
		type:Date,
		default:Date.now
	}
});

module.exports = mongoose.model("Egitmen",egitmenSchema)