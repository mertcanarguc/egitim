const async = require("async")
const Egitim = require("../models/egitim")
const Egitmen = require("../models/egitmen")
const Kategori = require("../models/kategori")
const Ogrenci = require("../models/user")

exports.admin = async(req,res,next) => {	
	let egitims = await Egitim.count() 
	let egitmens = await Egitmen.count()
	let kategoris = await Kategori.count()
    let ogrencis = await Ogrenci.find({"tip":2}).count()

	console.log(egitims,egitmens,kategoris)

    res.render("back/index",{
        title:"Anasayfa",
        egitims:egitims,
        egitmens:egitmens,
        kategoris:kategoris,
        ogrencis:ogrencis,
        user:req.user
    })
}
