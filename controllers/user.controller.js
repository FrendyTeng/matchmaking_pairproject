"use strict"

const { User } = require('../models');
const { sequelize } = require('../models')
const { comparePlainWithHash } = require("../helpers")

class UserController {
  // Suffix 'Handler' menadakan kalau method ini digunakan untuk hal-hal yang berhungan dengan logic dari login.
  static loginHandler(req, res) {
    const {email, password} = req.body

    User.findOne({ where: {email} })
      .then(user => {
        
        if(!user) return res.redirect("?errors=" + "Invalid email or password")
        const isValid = comparePlainWithHash(password, user.password)

        if(!isValid){
          return res.redirect("?errors=" + "Invalid email or password")
        }

        req.session.uid = user.id
        res.redirect("/users/profile/"+user.id)
        
      }).catch(err => {
        res.send(err)
      })

  }

  static logoutHandler(req, res){
    req.session.destroy((err)=>{
      if(err) return res.redirect("")
      return res.redirect("/users/login")
    })
    
  }

  static registerHandler(req, res){
    User.create({
      firstName: req.body.inputFirstName,
      lastName: req.body.inputLastName,
      password: req.body.inputPassword,
      email: req.body.inputEmail
    })

    .then(data => {
      
      res.redirect(`/users/profile/${data.id}`)
    })
    .catch(err => {
      res.render(`Errornya adalah ${err}`)
    })
  }

  static meHandler(req, res){
    const id = req.session.uid 
    res.redirect(`/users/profile/${id}`)
  }

  static editHandler(req, res){
    let id = Number(req.session.uid)

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
    const myid = req.session.uid
    if(myid) return res.redirect(`/users/profile/${myid}`)
    
    const errors = req.query.errors || ""
    res.render("login", { errors })
  }

  static registerPage(req, res){
    res.render("registerPage")
  }

  static profilePage(req, res){
    const otherId = parseInt(req.params.id)
    const myId = parseInt(req.session.uid)

    User.findOne({ where: {id: otherId}})
    .then(user => {
      console.log(otherId === myId)
      res.render("profilePage", { user, isMe: otherId === myId })
    })
    .catch(err => res.send(err))
  }
  
  static editPage(req, res){
    let id = Number(req.session.uid);

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

  static randomPage(req, res){
    // let dataId = req.session.uid
        let query = `SELECT * FROM "Users"
        ORDER BY RANDOM()
        LIMIT 1;`

        sequelize.query(query)
        .then(hasil => {
            //console.log(data[0])
            let data = hasil[0];
            // console.log('OKELAH' + data)
            res.render('randomPage',{ data });
            
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
    
  }

 
}

module.exports = UserController
