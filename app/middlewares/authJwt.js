const jwt = require("jsonwebtoken")
const configDB = require("../config/db.config")
const config= require("../config/auth.config")
const db = require("../models")


// We will Bootstrap this ROle 
const User = db.User
const Role= db.Role

verifyToken= (req, res, next)=>{
let token = req.headers["x-access-token"];

    if(!token){
    return res.status(403).send({message:"No Tekon given Forbidden"});
    }
    jwt.verify(token,config.secret, (err, decoded)=>{
            if(err){
                    res.status(401).send({message:"Unauth­orized!"})
            }
            req.userId = decoded.id;
            next();
        });
};

isAdmin=(req, res, next)=>{
    User.findById(req.userId).exec((err,user)=>{
        if(err){
            res.status(500).send({message: `Encounterd Some Error : ${err}`} )
            return;
        }

        Role.find(
            {
                _id:{$in:user.roles}
            },
            (err, roles)=>{
                if(err){
                    res.status(500).send({message: `Encounterd Some Error : ${err}`} )
                    return
                }
                for (let index = 0; index < roles.length; index++) {
                   if(roles[index].name==="admin"){
                       next();
                       return;
                   }
                    
                }

                res.status(403).send({message:"Require an Admin Role !"})
                return
            }

        )
    });

};


isLearner = (req, res, next)=>{
    User.findById(req.userId).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        // If No error get Assured that we will get the user if user then find roles ?
        Role.find(
            {
                _id:{$in:user.roles }
            },
            (err,roles)=>{
                if(err){
                    res.status(500).send({message:err});
                    return;
                }

                for (let index = 0; index < roles.length; index++) {
                    if(roles[index].name==="learner"){
                        next();
                        return;
                    }
                }

                res.status(401).send({message:"Required a learner role !"})
                return ;
            }
        )

    })
};


// we will plan more in future 
const authJwt={
    verifyToken,
    isAdmin,
    isLearner
}


module.exports=authJwt
