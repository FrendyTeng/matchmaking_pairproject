"use strict"

const { User } = require('../models');

class UserController {
  // Suffix 'Handler' menadakan kalau method ini digunakan untuk hal-hal yang berhungan dengan logic dari login.
  static loginHandler(req, res) {}

  static registerHandler(req, res){
    User.create({
      firstName: req.body.inputFirstName,
      lastName: req.body.inputLastName,
      userName: req.body.inputUserName,
      password: req.body.inputPassword,
      birthDate: req.body.inputBirthDate,
      gender: req.body.inputGender,
      email: req.body.inputEmail
    })

    .then(data => {
      res.redirect("/users/listAll")
    })
    .catch(err => {
      res.render(`Errornya adalah ${err}`)
    })
  }

  static editHandler(req, res){
    let id = Number(req.params.id)

    User.update({
      firstName: req.body.inputFirstName,
      lastName: req.body.inputLastName,
      birthDate: req.body.inputBirthDate,
      gender: req.body.inputGender,
      email: req.body.inputEmail
    }, { where: {id} })
    .then(data => {
      res.redirect("/users/listAll")
    })
    .catch(err => {
      res.send(`Errornya adalah ${err}`)
    })
  }

  // Suffix 'Page' menadakan kalau method ini digunakan untuk hal-hal yang berhungan dengan UI (tampilan) dari login.
  static loginPage(req, res) {
    res.send("Login Page")
  }

  static registerPage(req, res){
    res.render("registerPage")
  }

  static listAllPage(req, res){
    User.findAll()
    .then(data => {
      // console.log(data)
      res.render("listAll", { data })
    })
    .catch(err => {
      res.send("Errornya adalah ${err}")
    })
  }
  
  static editPage(req, res){
    let id = Number(req.params.id);

    User.findByPk(id)
    .then(hasil => {
      let data = [];
      data.push(hasil)
      res.render("editPage", { data })
    })
    .catch(err => {
      res.send(`Errornya adalah ${err}`)
    })
  }
}

module.exports = UserController
