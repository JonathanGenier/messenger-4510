const Sequelize = require("sequelize");
const db = require("../db");

const Status = db.define("message_statuses", {
  read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
});

module.exports = Status;