const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/db-connection");
const Doctor = require("./DoctorModel");

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\+?[1-9]\d{1,14}$/,
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Doctor",
        key: "id",
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    privacyPolicy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Appointment",
    timestamps: false,
    tableName: "appointments",
  }
);

module.exports = Appointment;
