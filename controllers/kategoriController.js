const async = require("async");
const Kategori = require("../models/kategori")
const Egitim = require("../models/egitim")

exports.kategori = async(req,res,next)=>{
	let kategori = await Kategori.find({ })
	res.render("back/kategori",{
		title:"Kategoriler",
		kategori:kategori,
		user:req.user
	})
}

exports.kategorid = async(req,res,next)=>{
	let kategori = await Kategori.findById({"_id":req.params.id})

	res.render("back/kategorid",{
		user:req.user,
		kategori:kategori,
		title:"Kategori Düzenle"
	})
}

exports.kategoridpost = async(req,res,next)=>{
	let kategori = await Kategori.findById({"_id":req.body.kategorid})

	kategori.update({
		ad:req.body.ad,
		aciklama:req.body.aciklama
	},(err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/kategori")
		}
	})
}

exports.kategoriekle = async(req,res,next)=>{
	new Kategori(req.body).save((err,data)=>{
		if (!err) {
			res.redirect("/admin/kategori")
		}
	})
}

exports.kategorisil = async(req,res,next) => {
	let kategori = await Kategori.findOne({"_id":req.params.id})

	kategori.remove((err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/kategori")
		}
	})
}

exports.kategorifront = async(req,res,next)=>{
	let kategori = await Kategori.find({ })
	let egitim = await Egitim.find({"kategori":req.params.id})
	let kat = await req.params.id

	res.render("front/kategori",{
		user:req.user,
		kategori:kategori,
		egitim:egitim,
		kat:kat
	})
}