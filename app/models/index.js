
const mongoose = require("mongoose")

mongoose.Promise=global.Promise // future 

const db={

}
db.mongoose= mongoose;
db.Role =require("./role.model")
db.User =require("./user.model")

db.ROLES=["learner","admin","instructor"]

module.exports = db