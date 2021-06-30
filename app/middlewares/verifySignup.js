const db = require("../models")

const ROLES = db.ROLES
const User= db.User 

checkDuplicateUsernameOrEmail= (req, resp, next)=>{
    // Username
    User.findOne({
       username:req.body.username 
    }).exec((err, user)=>{
        if(err){
            resp.status(500).send({message:err});
            return;
        }

        if(user){
            resp.status(400).send({message:"User already existed in the database !"});
            return;
        }
        // email ID

        User.findOne({
            email:req.body.email 
        }).exec((err, user)=>{
            if(err){
                resp.status(500).send({message:err});
                return;
            }
            if(user){
                resp.status(400).send({message:"User already existed in the database !"});
                return; 
            }
            next();
        });

    });
};

checkRoleEixisted =(req, resp, next)=>{
    if(req.body.roles){
        for (let index = 0; index < req.body.roles.length; index++) {
            if(!ROLES.includes(req.body.roles[index])){
                    resp.status(400).send({
                        message:` Role called ${req.body.roles[index]} does not exist` 
                    });
                    return;
            }
        }
    }
    next();
}


const verifySignUp={
    checkRoleEixisted,
    checkDuplicateUsernameOrEmail
}


module.exports=verifySignUp
// role existence 

// controller--> route

// configuration 

// roles will be created automatically 
// for user creation 
    //POST MAN 