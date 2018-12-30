var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:Ntcnbhjdfybt_01@localhost:5433/remont");
module.exports = db;