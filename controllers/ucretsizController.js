const Link = require("../models/ucretsizders")
const async = require("async")

exports.ekle = async(req,res,next)=>{
	new Link({
		baslik:req.body.baslik,
		link:req.body.link
	}).save((err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/link")
		}
	})
}

exports.linksil = async(req,res,next)=>{
	let link = await Link.findById({"_id":req.params.id})

	link.remove((err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/link")
		}
	})
}

exports.adminlink = async(req,res,next)=>{
	let link = await Link.find({}).sort({"createdAt":1})

	res.render("back/link",{
		user:req.user,
		link:link,
		title:"Ücretsiz Dersler"
	})
}
