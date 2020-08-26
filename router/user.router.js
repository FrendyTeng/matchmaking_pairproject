const r = require("express").Router()
const c = require("../controllers/user.controller")


r.get("/register", c.registerPage);
r.post("/register", c.registerHandler);
r.get("/listAll", c.listAllPage);
r.get("/login", c.loginPage);
r.post("/login", c.loginHandler);
r.get("/edit/:id", c.editPage);
r.post("/edit/:id", c.editHandler);



module.exports = r;
