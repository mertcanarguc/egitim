const mongoose = require("mongoose");
const Schema = mongoose.Schema

const sliderSchema = new Schema({
	path:String,
	link:String,
	baslik:String,
	aciklama:String,
	durum:Number,
	createdAt:{
		type:Date,
		default:Date.now
	}
})

module.exports = mongoose.model("Slider",sliderSchema)