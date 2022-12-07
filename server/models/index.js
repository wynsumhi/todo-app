"use strict";

const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.json")["development"];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
// sequelize 객체 선언시 매개변수로 "DB명, 사용자, 비번, 설정정보 전체" 정보를 받음

db.sequelize = sequelize;
db.Sequelize = Sequelize;
// db = { "sequlize": sequlize, "sequlize": sequlize };

db.Todo = require("./Todo")(sequelize, Sequelize);

module.exports = db;
