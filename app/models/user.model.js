const mongoose =require("mongoose")
// Role Based Security --> Authorization
// Authentication -> 
const User= mongoose.model(
    "User", new mongoose.Schema({
        username:String,
        email:String,
        password:String,
        roles:[
            {
                type : mongoose.Schema.Types.ObjectId,
                ref:"Role"
            }
        ]
    })
);
module.exports=User;

// not kn own
// Dheeraj, dheeraj@careerera.com,123456. [Admn, Learner , Instructor]