const async = require("async")
const Ogrenci = require("../models/user")
const Satis = require("../models/satis")
const moment = require("moment")
moment.locale("tr")

exports.ogrenci=async(req,res,next)=>{
	let ogrenci = await Ogrenci.find({"tip":2})
	res.render("back/ogrenci",{
		user:req.user,
		title:"Öğrenciler",
		ogrenci:ogrenci
	})
}

exports.ogrenciicerik = async(req,res,next)=>{
	let satis = await Satis.find({"userid":req.params.id})

	res.render("back/ogrenciicerik",{
		user:req.user,
		satis:satis,
		moment:moment
	})
}

exports.ogrenciadmin = async(req,res,next) =>{
	let ogrenci = await Ogrenci.findById({"_id":req.params.id})
	let satis = await Satis.find({"userid":req.params.id})
	res.render("back/ogrenciadmin",{
		user:req.user,
		ogrenci:ogrenci,
		satis:satis,
		moment:moment,
		title:ogrenci.ad+" ogrencisinin bigilerini güncelle"
	})
}

exports.ogrencisil = async(req,res,next)=>{
	let ogrenci = await Ogrenci.findById({"_id":req.params.id})
	ogrenci.remove((err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/ogrenciler")
		}
	})
}

exports.ogrenciupdate = async(req,res,next)=>{
	let ogrenci = await Ogrenci.findById({"_id":req.body.ogrenci})

	ogrenci.update({
		ad:req.body.ad,
		soyad:req.body.soyad,
		tc:req.body.tc,
		tel:req.body.tel,
		username:req.body.username,
		adres:req.body.adres,
		sehir:req.body.sehir,
		ilce:req.body.ilce,
		cinsiyet:req.body.cinsiyet,
		okul:req.body.okul,
	},(err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/ogrenciadmin/"+req.body.ogrenci)
		}
	})
}
