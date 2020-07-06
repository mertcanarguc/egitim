const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const kategoriSchema = new Schema({
	ad:String,
	aciklama:String,
	createdAt:{
		type:Date,
		default:Date.now
	}
})

module.exports = mongoose.model("Kategori",kategoriSchema)