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

    static unlike(req, res){
        let idUserB = Number(req.params.id);
        MatchMaking.destroy({
            where: {
                fkUserB: idUserB
            }
        }).then(() => {res.redirect("/users/ilike")})
        .catch(err => res.send(err))
    }

    static userILikePage(req, res){
        let dataId = req.session.uid
        // console.log('sdoivgaufibh ' + dataId)
        MatchMaking.findAll({where: {fkUserA: dataId},
        include: User })
        .then(users => {
            const data = users.map(u => u.User)
            res.render('userILikePage', { data })
        })
        .catch(err => {
            res.send(`Errornya adalah ${err}`)
        })   
        
    }

    static userWhoLikePage(req, res){
        let dataId = req.session.uid
        let query = `SELECT "Users"."id", "Users"."firstName", "Users"."image", "Users"."email", "Users"."lastName", to_char("Users"."birthDate", 'DD Mon YYYY') "birthDate", "Users"."gender" 
        FROM "Users", "MatchMakings"
        WHERE "MatchMakings"."fkUserA" = "Users"."id"
        AND "MatchMakings"."fkUserB" = ${dataId};`

        sequelize.query(query)
        .then(hasil => {
            let data = hasil[0];
            console.log(data[0])
            res.render('userWhoLikePage',{ data });
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
        
    }

}

module.exports = MatchMakingController;
 