
const auth = (req, res, next) => {
  if(req.session.uid)
    return next()
  
  res.redirect("/users/login")
}

module.exports = auth