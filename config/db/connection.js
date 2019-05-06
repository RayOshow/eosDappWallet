var mysql = require("mysql");
var dbConfig = require('./database').local;

module.exports = function() {
  return mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database
  })
};