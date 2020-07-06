const express = require('express');
const router = express.Router();
const mainController = require("../controllers/mainController")
const egitimController = require("../controllers/egitimController")
const egitmenController = require("../controllers/egitmenController")
const adminController = require("../controllers/adminController")
const kategoriController = require("../controllers/kategoriController")
const sliderController = require("../controllers/sliderController")
const iletisimController = require("../controllers/iletisimController")
const ogrenciController = require("../controllers/ogrenciController")
const satisController = require("../controllers/satisController")
const duyuruController = require("../controllers/duyuruController")
const blogController = require("../controllers/blogController")
const userController = require("../controllers/userController")
const sssController = require("../controllers/sssController")
const basvuruController = require("../controllers/onbasvuruController")
const ucretsizController = require("../controllers/ucretsizController")
const basinController = require("../controllers/basinController")
const multer = require("multer");
const slider = multer({dest:"public/upload/slider"})
const egitmen = multer({dest:"public/upload/egitmen"})
const egitim = multer({dest:"public/upload/egitim"})
const egitimvideo = multer({dest:"public/upload/video"})
const blog = multer({dest:"public/upload/blog"})
const basin = multer({dest:"public/upload/basin"})
const middleware = require("../controllers/middleware")
const Kategori = require("../models/kategori")


// router.get("/change",userController.change)
// router.get("/onbasvuruyap/:id",basvuruController.onbasvuruyap)
// router.get("/basvuru",basvuruController.basvuru)
// router.post("/ucretsiz",basvuruController.ucretsiz)
// router.get("/direkt",basvuruController.direkt)
// router.get("/yonlendir",basvuruController.yonlendir)
// router.get("/basin",mainController.basin)
// router.get("/blog",mainController.blogs)

router.post("/admin/linkekle",ucretsizController.ekle)
router.get("/admin/linksil/:id",ucretsizController.linksil)
router.get("/admin/link",ucretsizController.adminlink)

router.get("/admin",adminController.admin)
//MAİN PAGES
router.get("/",mainController.anasayfa)
router.get("/sartlar",mainController.sartlar)
router.get("/hakkimizda",mainController.hakkimizda)
router.get("/kategori/:id",kategoriController.kategorifront)
router.get("/iletisim",iletisimController.iletisim)
//SLİDER
router.get("/admin/slider",sliderController.slider)
router.post("/admin/sliderekle",slider.any(),sliderController.sliderekle)
router.get("/admin/slidersil/:id",sliderController.slidersil)
//KATEGORİLER
router.get("/admin/kategori",kategoriController.kategori)
router.post("/admin/kategoriekle",kategoriController.kategoriekle)
router.get("/admin/kategorisil/:id",kategoriController.kategorisil)
router.get("/admin/kategorid/:id",kategoriController.kategorid)
router.post("/admin/kategorid",kategoriController.kategoridpost)
//BLOG
router.get("/admin/blog",blogController.blog)
router.get("/admin/blogsil/:id",blogController.blogsil)
router.post("/admin/blogekle",blog.any(),blogController.blogekle)
router.post("/admin/blogduzenle",blogController.guncelle)
router.get("/admin/blogduzenle/:id",blogController.blogd)
//BASINDA BİZ
router.get("/admin/basin",basinController.basin)
router.get("/admin/basinsil/:id",basinController.basinsil)
router.post("/admin/basinekle",basin.any(),basinController.basinekle)
router.post("/admin/basinduzenle",basinController.guncelle)
router.get("/admin/basinduzenle/:id",basinController.basind)
//EĞİTİM
router.get('/egitimler',egitimController.egitim);
router.get('/egitim/:id',egitimController.egit);
router.get('/admin/egitim/:id',egitimController.egitimicerik)
router.post('/admin/videoekle',egitimvideo.any(),egitimController.videoekle)
router.get('/admin/videosil/:id',egitimController.videosil)

router.get('/admin/egitimler',egitimController.egitimler)
router.post('/admin/egitimekle',egitim.any(),egitimController.egitimekle)
router.get('/admin/egitimsil/:id',egitimController.egitimsil)
router.get('/admin/egitimd/:id',egitimController.egitimd)
router.post('/admin/egitimd',egitimController.egitimdpost)
//EĞİTMEN
router.get('/egitmenler',egitmenController.egitmen)
router.get('/admin/egitmenler',egitmenController.egitmenler)
router.post('/admin/egitmenekle',egitmen.any(),egitmenController.egitmenekle)
router.post('/admin/egitmenduzenle',egitmen.any(),egitmenController.egitmenduzenle)
router.get('/admin/egitmen/:id',egitmenController.egitmenadmin)
router.get('/admin/egitmensil/:id',egitmenController.egitmensil)
//ÖĞRENCİ
router.get("/admin/ogrenciler",ogrenciController.ogrenci)
router.get("/admin/ogrenciadmin/:id",ogrenciController.ogrenciadmin)
router.post("/admin/ogrenciupdate",ogrenciController.ogrenciupdate)
router.post("/admin/ogrencisifre",userController.change)
router.get("/admin/ogrencisil/:id",ogrenciController.ogrencisil)
//İLETİŞİM
// router.post("/iletisimekle",iletisimController.iletisimpost)
// router.post("/onay",satisController.onay)
//DUYURU
router.get("/admin/duyurular",duyuruController.duyuru)
router.get("/admin/duyurusil/:id",duyuruController.duyurusil)
router.post("/admin/duyuruekle",duyuruController.duyuruekle)
router.get("/admin/duyurud/:id",duyuruController.duyurud)
router.post("/admin/duyuruduzenle",duyuruController.duzenle)
//SATIŞ
router.get("/satis/:id",satisController.satis)
router.post("/satisyap",satisController.satisyap)
router.get("/admin/satis",satisController.adminsatis)
//SSS
router.get("/sss",sssController.sorucevap)
router.get("/admin/sss",sssController.sss)
router.get("/admin/ssssil/:id",sssController.sil)
router.post("/admin/sssekle",sssController.sssekle)
router.post("/admin/sssguncelle",sssController.guncelle)
router.get("/admin/sssguncelle/:id",sssController.sssguncelle)
//YONETİCİEKLE
router.get("/admin/yoneticiekle",userController.yoneticiekle)
//BAŞVURULAR
router.get("/admin/basvurular",basvuruController.basvurular)




// router.get("/basarili",function (req,res,next) {
// 	res.render("front/success")
// })


//T   E   S   T
router.get("/test",async function (req,res,next) {
	let kategori = await Kategori.find({ })
	res.render("front/odeme",{
		user:req.user,
		kategori:kategori
	})
})


module.exports = router;
