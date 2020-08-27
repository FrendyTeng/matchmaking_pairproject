const r = require("express").Router()
const c = require("../controllers/user.controller")
const m = require("../controllers/matchMakingController.js")

const auth = require("../middlewares/auth")

r.get("/login", c.loginPage)
r.post("/login", c.loginHandler)
r.get("/logout", [auth], c.logoutHandler)

r.get("/register", c.registerPage);
r.post("/register", c.registerHandler);
r.get("/profile/:id",  [auth] , c.profilePage);
r.get("/listAll", [auth],c.listAllPage);
r.get("/edit/", [auth], c.editPage);
r.post("/edit/",[auth], c.editHandler);


r.get("/like/:id", m.likePage)
r.get("/ilike", m.userILikePage)
r.get("/likeme", m.userWhoLikePage)

module.exports = r
