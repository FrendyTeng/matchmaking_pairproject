// File ini adalah terminal bagi semua router.
// Jadi semua router di require ke sini

const r = require("express").Router();
const userRouter = require("./user.router");

r.use("/users", userRouter);

r.get("/", function(req, res){
    res.redirect('/users/register')
});

module.exports = r;
