const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ucretsizSchema = new Schema({
	adsoyad:String,
	tel:String,
	mail:String
})

module.exports = mongoose.model("Ucretsiz",ucretsizSchema)