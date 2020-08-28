"use strict"

const { User, Sequelize, MatchMaking } = require('../models');
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
      if(err.name === "SequelizeValidationError" ){
        if(err.errors.length > 0){
          let errors = err.errors.map(error => {
            return error.message
          })
          console.log(errors);
          req.app.locals.message = errors;
        }
        res.redirect("/users/register");
      } else {
        res.render(`Errornya adalah ${err}`)
      }
      
    })
  }

  static meHandler(req, res){
    const id = req.session.uid 
    res.redirect(`/users/profile/${id}`)
  }

  static editHandler(req, res){
    let id = Number(req.session.uid)

    const payload = {}
    if(req.file){
      payload["image"] = "/users/"+ req.file.filename
    }

    if(req.body.inputBirthDate){
      payload["birthDate"] = new Date(req.body.inputBirthDate.toString())
    }

    User.update({
      firstName: req.body.inputFirstName,
      lastName: req.body.inputLastName,
      gender: req.body.inputGender,
      bio: req.body.bio,
      ...payload
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

    const message = req.app.locals.message || '';
    delete req.app.locals.message;
    res.render("registerPage", { message, errors: "" })

  }

  static profilePage(req, res){
    const otherId = parseInt(req.params.id)
    const myId = parseInt(req.session.uid)

    User.findOne({ where: {id: otherId}})
    .then(user => {
      res.render("profilePage", { user, isMe: otherId === myId, fullName: user.fullName })
    })
    .catch(err => res.send(err))
  }
  
  static editPage(req, res){
    let id = Number(req.session.uid);

    User.findByPk(id)
    .then(user => {
      res.render("editPage", { user, errors: "" })
    })
    .catch(err => {
      res.send(`Errornya adalah ${err}`)
    })
  }

  static listAllPage(req, res){

    MatchMaking.findAll({
      where: { fkUserA: req.session.uid },
    })
    .then(ids => {
      const idpart = ids.map(e => e.fkUserB)
      return User.findAll({
        where: {
          id: {[Sequelize.Op.notIn]: [req.session.uid, ...idpart] },
        }
      })
      .then(data => {
        res.render("listAll", { data })
      })
    })
    .catch(err => {
      res.send("Errornya adalah ${err}")
    })
  }

  static randomPage(req, res){
    let dataId = req.session.uid
        let query = `SELECT * FROM "Users" WHERE "Users"."id" != ${dataId}
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
