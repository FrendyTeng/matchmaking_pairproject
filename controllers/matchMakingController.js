"use strict"

const { User, MatchMaking } = require('../models');


class MatchMakingController {
    static likePage(req, res){
        let idUserB = Number(req.params.id);
        let idUserA = req.session.dataId;

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

}

module.exports = MatchMakingController;
 