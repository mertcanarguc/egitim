const async = require("async")
const Slider = require("../models/slider")
const fs = require("fs")

exports.slider = async(req,res,next) => {
	let slider = await Slider.find({})
	res.render("back/slider",{
		slider:slider,
		title:"Slider İşlemleri",
		user:req.user
	})
}

exports.sliderekle = async(req,res,next) => {
	const file = req.files
	if (file) {
		file.forEach( function(data) {
			new Slider({
				path:data.filename,
				baslik:req.body.baslik,
				aciklama:req.body.aciklama,
				link:req.body.link,
				durum:req.body.durum
			}).save((err,data)=>{
				if (err) {
					console.log(err)
				}else{
					res.redirect("/admin/slider")
				}
			})
		});
	}
}

exports.sliderduzenle = async(req,res,next) =>{
	let slider = await Slider.findById({"_id":req.params.id})

	
}

exports.slidersil = async(req,res,next) => {
	let slider = await Slider.findById({"_id":req.params.id})
	fs.unlinkSync("public/upload/slider/"+slider.path)
	slider.remove((err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/slider")
		}
	})
}