// Code First Approach  -- Simple | Decouples (Moderen Approach to create Softwares)
// Database First Approach -- Complex | Coupled 

const mongoose =require("mongoose")

const Role= mongoose.model(
    "Role", new mongoose.Schema({
        name:String
    })
);

module.exports=Role;