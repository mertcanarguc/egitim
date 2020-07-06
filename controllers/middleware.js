const async = require("async")
module.exports = async function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
    	if (req.user.tip !== 1){
    		res.redirect("/")
    	}

        next()
    } else{
        res.redirect("/users/login")
    }
}
