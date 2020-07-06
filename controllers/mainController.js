const async = require("async")
const Egitim = require("../models/egitim")
const Kategori = require("../models/kategori")
const Blog = require("../models/blog")
const Slider = require("../models/slider")
const Basin = require("../models/basin")

exports.anasayfa = async(req,res,next) => {
	/*let egitim = await Egitim.find({"durum":1}).sort({"createdAt":-1}).limit(4)
	let kategori = await Kategori.find({ })
	let blog = await Blog.find({ }).limit(6)
	let slider = await Slider.find({ })
	let basin = await Basin.find({ }).limit(6)
	res.render("front/index2",{
		egitim:egitim,
		kategori:kategori,
		slider:slider,
		user:req.user,
		blog:blog,
		basin:basin
	})*/
	res.redirect("/admin")
}

exports.basin = async(req,res,next)=>{
	let kategori = await Kategori.find({ })
	let basin = await Basin.find({ })
	res.render("front/basin",{
		user:req.user,
		kategori:kategori,
		basin:basin
	})
}


exports.blogs = async(req,res,next)=>{
	let kategori = await Kategori.find({ })
	let blog = await Blog.find({ })
	res.render("front/blog",{
		user:req.user,
		kategori:kategori,
		blog:blog,
	})
}

exports.sartlar = async(req,res,next) => {
	let kategori = await Kategori.find({ })
	res.render("sartlar",{
		title:"Şartlar ve Koşullar",
		kategori:kategori,
		user:req.user
	})
}

exports.hakkimizda = async(req,res,next) => {
	let kategori = await Kategori.find({ })
	res.render("front/hakkimizda",{
		title:"Misyonumuz ve Vizyonumuz",
		kategori:kategori,
		user:req.user
	})
}
