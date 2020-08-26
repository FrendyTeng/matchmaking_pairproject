const express = require("express")
const router = require("./router")

const PORT = process.env.PORT || 3000
const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(PORT, () =>
  console.log("Server is running at http://localhost:" + PORT)
)
