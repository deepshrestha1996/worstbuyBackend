module.exports = function (req, res, next) {
    var loggedInUser = req.loggedInUser;
    if (loggedInUser == "admin") {
        next();
    }
    else{
        next({
            message:"you dont have access",
            status: 403
        }) 
    }
}