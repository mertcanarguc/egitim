const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const iletisimSchema = new Schema({
	ad:String,
	soyad:String,
	mail:String,
	tel:String,
	aciklama:String,
	createdAt:{
		type:Date,
		default:Date.now
	}
});

module.exports = mongoose.model("İletisim",iletisimSchema)

