const Basvuru = require("../models/onbasvuru")
const Ucretsiz = require("../models/ucretsiz")
const Kategori = require("../models/kategori")
const Egitim = require("../models/egitim")
const Link = require("../models/ucretsizders")
const User = require("../models/user")
const flash = require("req-flash")

exports.onbasvuruyap = async(req,res,next)=>{
	let user = await User.findById({"_id":req.user._id})
	let egitim = await Egitim.findById({"_id":req.params.id})

	new Basvuru({
		egitim:egitim.ad,
		adsoyad:user.ad+" "+user.soyad,
		mail:user.username,
		tel:user.tel
	}).save((err,data)=>{
		if (err) {
			console.log(err)	
		}else{
			res.redirect("/basarili")
		}
	})
}

exports.ucretsiz = async(req,res,next)=>{
	new Basvuru({
		adsoyad:req.body.adsoyad,
		egitim:req.body.egitim,
		mail:req.body.mail,
		tel:req.body.tel
	}).save((err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/yonlendir")
		}
	})
}


exports.direkt = async(req,res,next)=>{
		new Ucretsiz({
			adsoyad:req.user.ad+" "+req.user.soyad,
			mail:req.user.username,
			tel:req.user.tel
		}).save((err,data)=>{
			if (err) {
				console.log(err)
			}else{
				res.redirect("/yonlendir")
			}
		})
}

exports.basvurular = async(req,res,next)=>{
	let basvuru = await Basvuru.find({}).sort({"createdAt":1})

	res.render("back/basvurular",{
		basvuru:basvuru,
		title:"Ders Başvuruları",
		user:req.user
	})
}

exports.yonlendir = async(req,res,next)=>{
	let kategori = await Kategori.find({ })
	let link = await Link.find({ })

	res.render("front/yonlendir",{
		user:req.user,
		kategori:kategori,
		link:link
	})
}

exports.basvuru = async(req,res,next)=>{
	let egitim = await Egitim.find({ })
	res.render("front/basvuru",{
		egitim:egitim
	})
}




