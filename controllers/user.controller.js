class UserController {
  // Suffix 'Handler' menadakan kalau method ini digunakan untuk hal-hal yang berhungan dengan logic dari login.
  static loginHandler(req, res) {}

  // Suffix 'Page' menadakan kalau method ini digunakan untuk hal-hal yang berhungan dengan UI (tampilan) dari login.
  static loginPage(req, res) {
    res.send("Login Page")
  }
}

module.exports = UserController
