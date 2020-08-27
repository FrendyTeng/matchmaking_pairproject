const express = require("express");
const router = require("./router");
const session =  require("express-session");

const PORT = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'mmSession',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

const myLogger = function(req, res, next){
  console.log(req.session)

  next();
}

app.use(myLogger);  

app.use(router)

app.listen(PORT, () =>
  console.log("Server is running at http://localhost:" + PORT)
)
