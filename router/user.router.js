const r = require("express").Router()
const c = require("../controllers/user.controller")
const m = require("../controllers/matchMakingController.js")

r.get("/login", c.loginPage)
r.post("/login", c.loginHandler)

r.get("/register", c.registerPage);
r.post("/register", c.registerHandler);
r.get("/profile/:id", c.profilePage);
r.get("/listAll", c.listAllPage);
r.get("/edit/", c.editPage);
r.post("/edit/", c.editHandler);


r.get("/like/:id", m.likePage)
r.get("/ilike", m.userILikePage)
r.get("/likeme", m.userWhoLikePage)

module.exports = r
