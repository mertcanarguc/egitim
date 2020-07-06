const Blog = require("../models/blog")
const fs = require("fs")

exports.blog = async(req,res,next)=>{
	let blog = await Blog.find({ })
	res.render("back/blog",{
		blog:blog,
		title:"Blog Yazıları",
		user:req.user
	})
}

exports.blogsil = async(req,res,next)=>{
	let blog = await Blog.findById({"_id":req.params.id})

	blog.remove((err,data)=>{
		if (err) {
			console.log(err)
		}else{
			fs.unlinkSync("public/upload/blog/"+blog.resim)
			res.redirect("/admin/blog")
		}
	})
}

exports.blogekle = async(req,res,next)=>{
	const file = req.files
	if (file) {
		file.forEach( function(data) {
			new Blog({
				baslik:req.body.baslik,
				link:req.body.link,
				resim:data.filename
			}).save((err,data)=>{
				if (err) {
					console.log(err)
				}else{
					res.redirect("/admin/blog")
				}
			})
		});
	}
}

exports.guncelle = async(req,res,next)=>{
	let blog = await Blog.findById({"_id":req.body.blogid})

	blog.update({
		baslik:req.body.baslik,
		link:req.body.link,
	},(err,data)=>{
		if (err) {
			console.log(err)
		}else{
			res.redirect("/admin/blog")
		}
	})
}

exports.blogd = async(req,res,next)=>{
	let blog = await Blog.findById({"_id":req.params.id})

	res.render("back/blogd",{
		blog:blog,
		user:req.user,
		title:"Düzenle"
	})
}




