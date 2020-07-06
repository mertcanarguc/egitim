const Basin = require("../models/basin")
const fs = require("fs")

exports.basin = async(req,res,next)=>{
	let basin = await Basin.find({ })
	res.render("back/basin",{
		basin:basin,
		title:"Blog Yazıları",
		user:req.user
	})
}

exports.basinsil = async(req,res,next)=>{
	let basin = await Basin.findById({"_id":req.params.id})

	basin.remove((err,data)=>{
		if (err) {
			console.log(err)
		}else{
			fs.unlinkSync("public/upload/basin/"+basin.resim)
			res.redirect("/admin/basin")
		}
	})
}

exports.basinekle = async(req,res,next)=>{
	const file = req.files
	if (file) {
		file.forEach( function(data) {
			new Basin({
				baslik:req.body.baslik,
				link:req.body.link,
				resim:data.filename
			}).save((err,data)=>{
				if (err) {
					console.log(err)
				}else{
					res.redirect("/admin/basin")
				}
			})
		});
	}
}

exports.guncelle = async(req,res,next)=>{
	let basin = await Basin.findById({"_id":req.body.basinid})

	basin.update({
		baslik:req.body.baslik,
		link:req.body.link,
	},(err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/basin")
		}
	})
}

exports.basind = async(req,res,next)=>{
	let basin = await Basin.findById({"_id":req.params.id})

	res.render("back/basind",{
		basin:basin,
		user:req.user,
		title:"Düzenle"
	})
}
