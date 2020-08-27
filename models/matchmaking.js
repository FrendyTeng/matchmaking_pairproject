'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MatchMaking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MatchMaking.belongsTo(models.User, {foreignKey: 'fkUserA'});
      MatchMaking.belongsTo(models.User, {foreignKey: 'fkUserB'});
    }
  };
  MatchMaking.init({
    fkUserA: DataTypes.INTEGER,
    fkUserB: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MatchMaking',
  });
  return MatchMaking;
};