const Duyuru = require("../models/duyuru")
const Egitim = require("../models/egitim")

exports.duyuru = async(req,res,next)=>{
	let duyuru = await Duyuru.find({ })
	let egitim = await Egitim.find({ })

	res.render("back/duyuru",{
		user:req.user,
		title:"Duyurular",
		duyuru:duyuru,
		egitim:egitim
	})
}

exports.duyurud = async(req,res,next)=>{
	let duyuru = await Duyuru.findById({"_id":req.params.id})
	let egitim = await Egitim.find({ })
	
	res.render("back/duyurud",{
		title:"Duyuru Düzenle",
		duyuru:duyuru,
		egitim:egitim,
		user:req.user
	})
}

exports.duzenle = async(req,res,next)=>{
	let duyuru = await Duyuru.findById({"_id":req.body.duyurid})
	
	duyuru.update({
		duyuru:req.body.duyuru,
		link:req.body.link,
		egitim:req.body.egitim
	},(err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/duyurular")
		}
	})
}

exports.duyuruekle = async(req,res,next)=>{
	let egitimad = await Egitim.findById({"_id":req.body.egitim})
	new Duyuru({
		duyuru:req.body.duyuru,
		egitim:egitimad._id,
		egitimad:egitimad.ad,
		link:req.body.link
	}).save((err,data)=>{
		if (!err){
			res.redirect("/admin/duyurular")
		}
	})
}

exports.duyurusil = async(req,res,next)=>{
	let duyuru = await Duyuru.findByIdAndRemove({"_id":req.params.id},(err,data)=>{
		if (!err) {
			res.redirect("/admin/duyurular")
		}
	})
}
