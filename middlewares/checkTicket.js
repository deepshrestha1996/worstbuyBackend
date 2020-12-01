var checkToken=function(req, res ,next){
    console.log("inside checkToken")
    return next("error handling middleware");
}
module.exports = checkToken;