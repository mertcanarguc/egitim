const async = require("async")
const Egitim = require("../models/egitim")
const Kategori = require("../models/kategori")
const Egitmen = require("../models/egitmen")
const Video = require("../models/egitimvideos")
const Satis = require("../models/satis")
const Basvuru = require("../models/onbasvuru")
const Duyuru = require("../models/duyuru")
const fs = require("fs")
const flash = require("req-flash")

exports.egitim = async(req,res,next) => {
	let egitim = await Egitim.find({"durum":1})
	let kategori = await Kategori.find({ })
	let egitmen = await Egitmen.find({ })
	res.render('front/kurslar',{
		title:"",
		description:"",
		egitim:egitim,
		kategori:kategori,
		egitmen:egitmen,
		user:req.user
	})
}

exports.egit = async(req,res,next) => {
	let egitim = await Egitim.findOne({"_id":req.params.id})
	let videos = await Video.find({"egitim":req.params.id})
	let kategori = await Kategori.find({ })
	let duyuru = await Duyuru.find({"egitim":egitim._id})


	res.render("front/edetail",{
		title:egitim.ad,
		description:egitim.aciklama,
		egitim:egitim,
		user:req.user,
		kategori:kategori,
		duyuru:duyuru,
		videos:videos,
		user:req.user
	})
}

exports.egitimicerik = async(req,res,next) =>{
	let egitim = await Egitim.findById({"_id":req.params.id})
	let videos = await Video.find({"egitim":req.params.id})
	let satis = await Satis.find({"egitimid":egitim._id})
	let basvuru = await Basvuru.find({"egitim":egitim._id})


	console.log(videos)

	res.render("back/egitimicerik",{
		title:egitim.ad,
		description:"Eğitim İçerik Güncelle",
		egitim:egitim,
		videos:videos,
		satis:satis,
		basvuru:basvuru,
		user:req.user
	})
}

exports.videoekle = async(req,res,next) => {
	let gelen = await req.body;
	let file =  await req.files;
	console.log(file)

	file.forEach( function(data) {
		new Video({
			egitim:gelen.egitid,
			baslik:gelen.baslik,
			video:data.filename
		}).save((err,data)=>{
			if (err) {
				console.log(err)
			}else{
				res.redirect("/admin/egitim/"+gelen.egitid)
			}
		})
	});

}

exports.videosil = async(req,res,next) => {
	let video = await Video.findById({"video":req.params.id})
	fs.unlinkSync("public/upload/video/"+video.video)
	video.remove((err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/egitim/"+req.params.id)
		}
	})
}

exports.egitimler = async(req,res,next)=> {
	let egitim = await Egitim.find({ })
	let kategori = await Kategori.find({ })
	let egitmen = await Egitmen.find({ })
	res.render("back/egitim",{
		title:"",
		description:"",
		egitim:egitim,
		kategori:kategori,
		egitmen:egitmen,
		user:req.user
	})
}

exports.egitimd = async(req,res,next)=> {
	let egitim = await Egitim.findById({"_id":req.params.id})
	let kategori = await Kategori.find({ })
	let egitmen = await Egitmen.find({ })
	res.render("back/egitimd",{
		title:"",
		description:"",
		egitim:egitim,
		kategori:kategori,
		egitmen:egitmen,
		user:req.user
	})
}

exports.egitimdpost = async(req,res,next)=>{
	let egitim = await Egitim.findById({"_id":req.body.egitimid})

	egitim.update(req.body,(err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/egitimler")
		}
	})


}

exports.egitimekle = async(req,res,next)=> {
	const file = req.files
	file.forEach( function(data) {
		if (data) {
			new Egitim({
				ad:req.body.ad,
				aciklama:req.body.aciklama,
				egitmen:req.body.egitmen,
				kategori:req.body.kategori,
				katid:req.body.katid,
				foto:data.filename,
				kacv:req.body.kacv,
				saat:req.body.saat,
				hafta:req.body.hafta,
				ay:req.body.ay,
				tutar:req.body.tutar,
				durum:req.body.durum
			}).save((err,data)=>{
				if (err) {
					console.log(err)
				}else{
					res.redirect("/admin/egitimler")
				}
			})
		}
	});
}

exports.egitimsil = async(req,res,next) => {
	let egitim = await Egitim.findById({"_id":req.params.id})
	fs.unlinkSync("public/upload/egitim/"+egitim.foto)
	egitim.remove((err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/egitimler")
		}
	})
}
