const async = require("async")
const İletisim = require("../models/iletisim")
const Kategori = require("../models/kategori")

exports.iletisim = async(req,res,next)=>{
	let kategori = await Kategori.find({ })
	res.render("front/iletisim",{
		user:req.user,
		title:"Dini Akademi İletişim Formu",
		kategori:kategori
	})
}

exports.iletisimpost = async(req,res,next)=>{
	new İletisim({
		ad:req.body.ad,
		soyad:req.body.soyad,
		mail:req.body.mail,
		tel:req.body.tel,
		aciklama:req.body.aciklama
	}).save((err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/")
		}
	})
}

exports.iletisimadmin = async(req,res,next)=>{
	let iletisim = await İletisim.find({ })
	res.render("back/iletisim",{
		user:req.user,
		title:"İletişim Başvuruları",
		iletisim:iletisim
	})
}