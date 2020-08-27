"use strict"

const { User } = require('../models');

class UserController {
  // Suffix 'Handler' menadakan kalau method ini digunakan untuk hal-hal yang berhungan dengan logic dari login.
  static loginHandler(req, res) {}

  static registerHandler(req, res){
    User.create({
      firstName: req.body.inputFirstName,
      lastName: req.body.inputLastName,
      password: req.body.inputPassword,
      email: req.body.inputEmail
    })

    .then(data => {
      req.session.dataId = data.id
      res.redirect(`/users/profile/${data.id}`)
    })
    .catch(err => {
      res.render(`Errornya adalah ${err}`)
    })
  }

  static editHandler(req, res){
    let id = Number(req.session.dataId)

    User.update({
      firstName: req.body.inputFirstName,
      lastName: req.body.inputLastName,
      birthDate: req.body.inputBirthDate,
      gender: req.body.inputGender,
      email: req.body.inputEmail
    }, { where: {id} })
    .then(data => {
      res.redirect(`/users/profile/${id}`)
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

  static profilePage(req, res){
    let id = Number(req.params.id);

    User.findByPk(id)
    .then(hasil => {
      let data = [];
      data.push(hasil);
      res.render('profilePage', { data })
    })
    .catch(err => {
      res.send(`Errornya adalah ${err}`)
    })
  }


  static listAllPage(req, res){
    User.findAll()
    .then(data => {
      console.log(req.session.id)
      res.render("listAll", { data })
    })
    .catch(err => {
      res.send("Errornya adalah ${err}")
    })
  }

 
}

module.exports = UserController
