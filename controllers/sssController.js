const Sss = require("../models/sss")
const Kategori = require("../models/kategori")

exports.sss = async(req,res,next)=>{
	let sss = await Sss.find({ })
	res.render("back/sss",{
		user:req.user,
		title:"Sık Sorulan Sorular",
		sss:sss
	})
}

exports.sorucevap = async(req,res,next)=>{
	let sss = await Sss.find({ })
	let kategori = await Kategori.find({ })
	res.render("front/sss",{
		user:req.user,
		title:"Sık Sorular Sorular",
		sss:sss,
		kategori:kategori

	})
}

exports.guncelle = async(req,res,next)=>{
	let sss = await Sss.findById({"_id":req.body.sid})

	sss.update(req.body,(err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/sss")
		}
	})
}

exports.sssguncelle = async(req,res,next)=>{
	let sss = await Sss.findById({"_id":req.params.id})
	let kategori = await Kategori.find({ })

	res.render("back/sssg",{
		sss:sss,
		kategori:kategori,
		user:req.user,
		title:"SSS Güncelle"
	})
}

exports.sssekle = async(req,res,next)=>{
	console.log(req.body)
	new Sss(req.body).save((err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/sss")
		}
	})
}

exports.sil = async(req,res,next)=>{
	let sss = await Sss.findById({"_id":req.params.id})

	sss.remove((err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/sss")
		}
	})
}