const r = require("express").Router()
const c = require("../controllers/user.controller")

r.get("/login", c.loginPage)
r.post("/login", c.loginHandler)

module.exports = r
