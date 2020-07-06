const async = require("async")
const Egitmen = require("../models/egitmen")
const fs = require("fs")

exports.egitmen = async(req,res,next) => {
	let egitmen = await Egitmen.find({ });

	res.render("front/egitmen",{
		title:"",
		description:"",
		egitmen:egitmen
	})
}


exports.egitmenler = async(req,res,next)=> {
	let egitmen = await Egitmen.find({ });

	res.render("back/egitmen",{
		title:"",
		description:"",
		egitmen:egitmen,
		user:req.user
	})
}

exports.egitmenduzenle = async(req,res,next)=>{
	let egitmen = await Egitmen.findById({"_id":req.body.egitid})

		egitmen.update({
			ad:req.body.ad,
			soyad:req.body.soyad,
			brans:req.body.brans,
			aciklama:req.body.aciklama,
		},(err,data)=>{
			if (!err) {
				res.redirect("/admin/egitmenler")
			}
		})
}

exports.egitmenadmin = async(req,res,next)=>{
	let egitmen = await Egitmen.findById({"_id":req.params.id})

	res.render("back/egitmend",{
		title:egitmen.ad+" "+egitmen.soyad+" düzenle",
		egitmen:egitmen,
		user:req.user
	})
}


exports.egitmenekle = async(req,res,next)=>{
	const file = req.files
	if (file) {
		file.forEach( function(data) {
			new Egitmen({
				ad:req.body.ad,
				soyad:req.body.soyad,
				brans:req.body.brans,
				aciklama:req.body.aciklama,
				foto:data.filename
			}).save((err,data)=>{
				if (err) {
					console.log(err)
				}else{
					res.redirect("/admin/egitmenler")
				}
			})
		});
	}
}

exports.egitmensil = async(req,res,next)=> {
	Egitmen.findByIdAndRemove({"_id":req.params.id},(err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/egitmenler")
		}
	})
}
