const async = require("async")
const User = require("../models/user")
const passport = require("passport");

exports.yoneticiekle = async(req,res,next)=>{
  let yonetici = await User.find({"tip":0})
  res.render("back/yoneticiekle",{
    yonetici:yonetici,
    user:req.user,
    title:"Yönetici Ekle",
    description:"Yönetici Ekle"
  })
}

exports.index = async(req,res,next)=>{
  res.render('index', { user: req.user });
}

exports.registerget = async(req,res,next)=>{
    res.render('register', { });
}

exports.registerpost = async(req,res,next)=>{
	User.register(new User({
    	username:req.body.username,
      password:req.body.password,
    	ad:req.body.ad,
    	soyad:req.body.soyad,
    	sehir:req.body.sehir,
    	ilce:req.body.ilce,
    	okul:req.body.okul,
    	yas:req.body.yas,
    	tc:req.body.tc,
    	tel:req.body.tel,
    	adres:req.body.adres,
    	cinsiyet:req.body.cinsiyet,
    	tip:req.body.tip
    }),
    req.body.password, function(err, user) {
   	 if (err) {
      console.log(err)

   		 return res.render('register', { user: user });
   	 }

   	 passport.authenticate('local')(req,res, function() {
   		 res.redirect('/');
   	 });
    });
}

exports.uyekaydet = async(req,res,next)=>{
	User.register(new User({
    	username:req.body.username,
      password:req.body.password,
    	ad:req.body.ad,
    	soyad:req.body.soyad,
    	sehir:req.body.sehir,
    	ilce:req.body.ilce,
    	okul:req.body.okul,
    	yas:req.body.yas,
    	tc:req.body.tc,
    	tel:req.body.tel,
    	adres:req.body.adres,
    	cinsiyet:req.body.cinsiyet,
    	tip:req.body.tip
    }),
    req.body.password, function(err, user) {
   	 if (err) {
   		 return res.render('register', { user: user });
   	 }
     if (user.tip == 0) {
      res.redirect("/admin/yoneticiekle")
     }else{
      res.redirect("/admin/ogrenciler")
     }
    });
}

exports.loginget = async(req,res,next)=>{
    res.render('login', { user : req.user });
}

exports.loginadmin = async(req,res,next)=>{
    res.render('back/login', { user : req.user });
}

exports.loginpost = async(req,res,next)=>{
	if (req.user.tip == 1) {
    res.redirect("/admin")
  }else{
    res.redirect("/")
  }
}

exports.logout = async(req,res,next)=>{
	req.logout();
    res.redirect('/');
}

exports.change = async(req,res,next)=>{
  User.findByUsername(req.body.omail).then(function (user) {
    if (user) {
      user.setPassword(req.body.password,function  () {
        user.save((err,data)=>{
          if (err) {
            console.log(err)
          }else{
            console.log(data)
            res.redirect("/admin/ogrenciadmin/"+req.body.oid)
          }
        })
      },(err,data)=>{
        if (!err) {
          console.log(err)
        }
      })
    }
  })
}
