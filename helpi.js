exports.checkSignIn = function (req, res, next){
  if(req.session.user){
    next()
  } else {
    var err = new Error("Not logged in!");
    console.log(req.session.user);
    res.redirect('/login')
    next(err);  //Error, trying to access unauthorized page!
  }
}