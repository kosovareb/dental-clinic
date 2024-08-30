const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database/db-connection");

class Service extends Model {}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Service",
    tableName: "services",
    timestamps: false,
  }
);

module.exports = Service;
