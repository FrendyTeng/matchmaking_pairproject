const r = require("express").Router()
const c = require("../controllers/user.controller")

r.get("/login", c.loginPage)
r.post("/login", c.loginHandler)

r.get("/register", c.registerPage);
r.post("/register", c.registerHandler);
r.get("/profile/:id", c.profilePage);
r.get("/listAll", c.listAllPage);

module.exports = r
