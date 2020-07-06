const mongoose = require("mongoose")
const Schema = mongoose.Schema

const odemeSchema = new Schema({
	userid:String,
	userad:String,
	egitimid:String,
	egitimcat:String,
	egitimfoto:String,
	egitimad:String,
	cardnumber:String,
	cardyear:Number,
	cardmonth:Number,
	cardHoldername:String,
	cardcvc:Number,
	tutar:Number,
	createdAt:{
		type:Date,
		default:Date.now
	}
})

module.exports = mongoose.model("Odeme",odemeSchema)