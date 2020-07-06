const mongoose = require("mongoose")
const Schema = mongoose.Schema

const basinSchema = new Schema({
  baslik:String,
	link:String,
	resim:String
})

module.exports = mongoose.model("Basin",basinSchema)
