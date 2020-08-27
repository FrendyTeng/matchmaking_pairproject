"use strict"

const { User, MatchMaking } = require('../models');
const { sequelize } = require('../models')

class MatchMakingController {
    static likePage(req, res){
        let idUserB = Number(req.params.id);
        let idUserA = req.session.uid;

        MatchMaking.create({
            fkUserA : idUserA,
            fkUserB: idUserB
        })
        .then(data => {
            res.redirect("/users/listAll")
        })
        .catch(err => {
            res.send(`Errornya adalah ${err}`)
        })
    }

    static userILikePage(req, res){
        let dataId = req.session.uid
        // console.log('sdoivgaufibh ' + dataId)
        MatchMaking.findAll({where: {fkUserA: dataId},
        include: User })
        .then(data => {
            // console.log(data)
            res.render('userILikePage', { data })
        })
        .catch(err => {
            res.send(`Errornya adalah ${err}`)
        })   
        
    }

    static userWhoLikePage(req, res){
        let dataId = req.session.uid
        let query = `SELECT "Users"."firstName", "Users"."lastName", to_char("Users"."birthDate", 'DD Mon YYYY') "birthDate", "Users"."gender" 
        FROM "Users", "MatchMakings"
        WHERE "MatchMakings"."fkUserA" = "Users"."id"
        AND "MatchMakings"."fkUserB" = ${dataId};`

        sequelize.query(query)
        .then(hasil => {
            //console.log(data[0])
            let data = hasil[0];
            res.render('userWhoLikePage',{ data });
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
        
    }

}

module.exports = MatchMakingController;
 