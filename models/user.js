'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require("../helpers")

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.MatchMaking, {foreignKey: 'fkUserA'});
      User.hasMany(models.MatchMaking, {foreignKey: 'fkUserB'});
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    hooks: {
      beforeCreate(self){
        self.password = hashPassword(self.password)
        self.image = "/noimage.jpeg"
      }
    },
    sequelize,
    validate: {
      checkEmpty(){
        if(this.firstName === '' || this.lastName === '' || this.email === '' || this.password === ''){
          throw new Error('All form must be filled')
        }
      },
      checkFirstNameLastName(){
        if(this.firstName === this.lastName){
          throw new Error('First Name and Last Name cannot be the same')
        }
      }
    },
    modelName: 'User',
  });
  return User;
};