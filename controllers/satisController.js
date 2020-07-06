const async = require("async")
const Satis = require("../models/satis")
const Egitim = require("../models/egitim")
const Kategori = require("../models/kategori")
const base64 = require('base-64');
const url = require("url")
const querystring = require("querystring")
const session = require("express-session")
const escape_html_entities = require('escape-html-in-json')

const Iyzipay = require('iyzipay');
const moment = require("moment")
moment.locale("tr")



/*
var iyzipay = new Iyzipay({
	apiKey: "sandbox-l8tuVh0SCPajyqxuK7dvSWY5cCDSIZ3t",
	secretKey: "sandbox-2I2IBSfyD7lhOUWf90fWP7Jr2JL7f7S4",
	uri: 'https://sandbox-api.iyzipay.com'
});

*/

var iyzipay = new Iyzipay({
    apiKey: "C7extmhyKXr4Ac7hD8coR2UBW6UQa6Re",
    secretKey: "fjJEU7uOJAwCvKieYVwijCleVzbZF81v",
    uri: 'https://api.iyzipay.com'
});
/*
exports.satisyap = async(req,res,next)=>{
    let egitim = await Egitim.findById({"_id":req.body.egtmid})

    req.session.userid = await req.user._id
    req.session.userad = await req.user.ad +" "+ req.user.soyad
    req.session.egitimid = await egitim._id
    req.session.egitimcat = await egitim.kategori
    req.session.egitimfoto = await egitim.foto
    req.session.egitimad = await egitim.ad
    req.session.cardnumber = await req.body.cardnumber
    req.session.cardyear = await req.body.cardyil
    req.session.cardmonth = await req.body.carday
    req.session.cardHoldername = await req.body.cardad
    req.session.cardcvc = await req.body.cardcvc
    req.session.tutar = await egitim.tutar

    console.log(req.session)

    var request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: '123456789',
        price: egitim.tutar.toString(),
        paidPrice: egitim.tutar.toString(),
        currency: Iyzipay.CURRENCY.TRY,
        installment: '1',
        basketId: 'B67832',
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl: 'https://diniakademi.com/onay',
        paymentCard: {
            cardHolderName: req.body.cardad.toString(),
            cardNumber: req.body.cardnumber.toString(),
            expireMonth: req.body.carday.toString(),
            expireYear: req.body.cardyil.toString(),
            cvc: req.body.cardcvc.toString(),
            registerCard: '0'
        },
        buyer: {
            id: req.user._id.toString(),
            name: req.user.ad.toString(),
            surname: req.user.soyad.toString(),
            gsmNumber: req.user.tel.toString(),
            email: req.user.username.toString(),
            identityNumber: req.user.tc.toString(),
            lastLoginDate: '2015-10-05 12:43:35',
            registrationDate: '2013-04-21 15:12:09',
            registrationAddress: req.user.adres.toString(),
            ip: '85.34.78.112',
            city: req.user.sehir.toString(),
            country: 'Turkey',
            zipCode: '34732'
        },
        shippingAddress: {
            contactName: req.user.ad.toString() + req.user.soyad.toString(),
            city: req.user.sehir.toString() + req.user.ilce.toString(),
            country: 'Turkey',
            address: req.user.adres,
            zipCode: '34742'
        },
        billingAddress: {
            contactName: req.user.ad.toString() + req.user.soyad.toString(),
            city: req.user.sehir.toString() + req.user.ilce.toString(),
            country: 'Turkey',
            address: req.user.adres.toString(),
            zipCode: '34742'
        },
        basketItems: [
            {
                id: egitim._id.toString(),
                name: egitim.ad.toString(),
                category1: egitim.kategori.toString(),
                category2: egitim.kategori.toString(),
                itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                price: egitim.tutar.toString()
            }
        ]
    };

    await iyzipay.threedsInitialize.create(request, function (err, result) {
        console.log(err, result);
        res.send(base64.decode(result.threeDSHtmlContent))
    });

}

exports.onay = async(req,res,next)=>{
    var iyzipay = new Iyzipay({
        apiKey: "C7extmhyKXr4Ac7hD8coR2UBW6UQa6Re",
        secretKey: "fjJEU7uOJAwCvKieYVwijCleVzbZF81v",
        uri: 'https://api.iyzipay.com'
    });

    iyzipay.threedsPayment.create({
        conversationId: '123456789',
        locale: Iyzipay.LOCALE.TR,
        paymentId: req.body.paymentId.toString(),
        conversationData: '',
    }, function (err, result) {
        new Satis(req.session).save()
        res.redirect("/")
    });
}
*/



    exports.satisyap = async(req,res,next)=>{
        let egitim = await Egitim.findById({"_id":req.body.egtmid})
        req.session.userid = await req.user._id
        req.session.userad = await req.user.ad +" "+ req.user.soyad
        req.session.egitimid = await egitim._id
        req.session.egitimcat = await egitim.kategori
        req.session.egitimfoto = await egitim.foto
        req.session.egitimad = await egitim.ad
        req.session.cardnumber = await req.body.cardnumber
        req.session.cardyear = await req.body.cardyil
        req.session.cardmonth = await req.body.carday
        req.session.cardHoldername = await req.body.cardad
        req.session.cardcvc = await req.body.cardcvc
        req.session.tutar = await egitim.tutar
        console.log(req.session)
        var request = {
                locale: Iyzipay.LOCALE.TR,
                conversationId: '123456789',
                price: egitim.tutar.toString(),
                paidPrice: egitim.tutar.toString(),
                currency: Iyzipay.CURRENCY.TRY,
                basketId: 'B67832',
                paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
                callbackUrl: 'https://diniakademi.com/onay',
                enabledInstallments: [2, 3, 6, 9],
                buyer: {
                    id: req.user._id.toString(),
                    name: req.user.ad.toString(),
                    surname: req.user.soyad.toString(),
                    gsmNumber: req.user.tel.toString(),
                    email: req.user.username.toString(),
                    identityNumber: req.user.tc.toString(),
                    lastLoginDate: '2015-10-05 12:43:35',
                    registrationDate: '2013-04-21 15:12:09',
                    registrationAddress: req.user.adres.toString(),
                    ip: '85.34.78.112',
                    city: req.user.sehir.toString(),
                    country: 'Turkey',
                    zipCode: '34732'
                },
                shippingAddress: {
                    contactName: req.user.ad.toString() + req.user.soyad.toString(),
                    city: req.user.sehir.toString() + req.user.ilce.toString(),
                    country: 'Turkey',
                    address: req.user.adres,
                    zipCode: '34742'
                },
                billingAddress: {
                    contactName: req.user.ad.toString() + req.user.soyad.toString(),
                    city: req.user.sehir.toString() + req.user.ilce.toString(),
                    country: 'Turkey',
                    address: req.user.adres.toString(),
                    zipCode: '34742'
                },
                basketItems: [
                    {
                        id: egitim._id.toString(),
                        name: egitim.ad.toString(),
                        category1: egitim.kategori.toString(),
                        category2: egitim.kategori.toString(),
                        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
                        price: egitim.tutar.toString()
                    }
                ]

        };

        iyzipay.checkoutFormInitialize.create(request, function (err, result) {
            console.log(err, result);
            res.send(result.checkoutFormContent + '<html><head> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script></head><body> <h3 class="text-center">Ödeme Ekranı</h3> <div class="col-md-3"></div> <div class="col-md-6" id="iyzipay-checkout-form" class="popup"></div></body></html>');
        });
    }

    exports.onay = async(req,res,next)=>{
        var iyzipay = new Iyzipay({
            apiKey: "C7extmhyKXr4Ac7hD8coR2UBW6UQa6Re",
            secretKey: "fjJEU7uOJAwCvKieYVwijCleVzbZF81v",
            uri: 'https://api.iyzipay.com'
        });

        const token = req.body.token

        iyzipay.checkoutForm.retrieve({
            conversationId: '123456789',
            locale: Iyzipay.LOCALE.TR,
            token:token,
        }, function (err, result) {
            new Satis(req.session).save()
            res.redirect("/")
        });
    }



exports.satis = async(req,res,next)=>{
	let egitim = await Egitim.findById({"_id":req.params.id})
	let kategori = await Kategori.find({ })

	res.render("front/odeme",{
		user:req.user,
		kategori:kategori,
		egitim:egitim
	})
}

exports.adminsatis = async(req,res,next)=>{
	let satis = await Satis.find({ }).sort({"createdAt":1})

	res.render("back/satis",{
		user:req.user,
		title:"Satışlar",
		satis:satis,
		moment:moment
	})
}

exports.testet = async(req,res,next)=>{
    var iyzipay = new Iyzipay({
        apiKey: "C7extmhyKXr4Ac7hD8coR2UBW6UQa6Re",
        secretKey: "fjJEU7uOJAwCvKieYVwijCleVzbZF81v",
        uri: 'https://api.iyzipay.com'
    });

    iyzipay.threedsPayment.create({
        conversationId: '123456789',
        locale: Iyzipay.LOCALE.TR,
        paymentId: '449388820',
        conversationData: '',
    }, function (err, result) {
        console.log(err, result);
    });
}
