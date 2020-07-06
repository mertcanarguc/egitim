const mongoose = require("mongoose");
const Schema = mongoose.Schema

const videosSchema = new Schema({
	egitim:String,
	baslik:String,
	video:String,
	createdAt:{
		type:Date,
		default:Date.now
	}
})

module.exports = mongoose.model("Video",videosSchema)