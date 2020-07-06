const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
	username:{
		type:String,
	},
	password:{
		type:String,
	},
	ad:{
		type:String,
	},
	soyad:{
		type:String,
	},
	sehir:{
		type:String,
	},
	ilce:{
		type:String,
	},
	okul:{
		type:String,
	},
	yas:{
		type:Number,
	},
	tc:{
		type:String,
	},
	tel:{
		type:String,
	},
	adres:{
		type:String,
	},
	cinsiyet:{
		type:String,
	},
	tip:{
		type:Number,
	},
	createdAt:{
		type:Date,
		default:Date.now
	}
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",userSchema)