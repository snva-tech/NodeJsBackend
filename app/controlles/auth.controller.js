
const config = require("../config/auth.config")
const db = require("../models")
const User = db.User;
const Role= db.Role;


const jwt =require("jsonwebtoken")
const brcypt=require("bcryptjs")

exports.signup= (req,res)=>{
    console.warn(`REQUEST ${req.body.password} | ${req.body.email} |${req.body.username} `)
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: brcypt.hashSync(req.body.password)
    });

    user.save((error, user)=>{
        if(error){
            res.status(500).send({message:"Error "+ error})
            return;
        }

        if(req.body.roles){
            Role.find({
                name:{$in:req.body.roles}
            },
            (err,roles)=>{
                if(err){
                    res.status(500).send({message:"Error "+ err})
                    return ;
                }
                user.roles= roles.map(role=>role._id);

                user.save((error,user)=>{
                    if(error){
                        res.status(500).send({message:"Error "+ error})
                        return ;
                    }
                    res.send({message:"User created successfully",roles:user.roles})
                });
            });
        }
        else{
            Role.findOne({name:"learner"},(error,roles)=>{
                if(error){
                    res.status(500).send({message:"Error "+ error})
                    return; 
                }
                res.send({message:"User was registered successfully with ",roles:roles})
            })
        }
    });
}

    // ROles | Request -> {name: first last email hash(password) roles[]}
    // User Attach
    // Save
// Relational Database | Document Database
// NOrmalization
// Denormailzation
exports.signin= (req,res)=>{
    User.findOne({
        username:req.body.username
    })
    .populate("roles","-__v") // if found | Not Found
    .exec((err, user)=>{
        if(err){
            res.status(500).send({message:err+"signin controller error"});
            return;
        }

        if(!user){
         return res.status(404).send({message:"Not Found "});
        }
            //  bcrypt the password
        var passwordIsValid= brcypt.compareSync(
            req.body.password,// coming from postman| React etc etc
            user.password // coming from database  
        );
        if(!passwordIsValid){
            return res.status(401).send({
                accessToken:null,
                message:"in correct passwor or something"
            });
        }
        // win win approach

        var token= jwt.sign({id:user.id},config.secret,{
            expiresIn:86400// 24 hours as per seconds
        })

        // sending the token 
        // authentication | authorization

        var authorities =[];

        for (let index = 0; index < user.roles.length; index++) {
            authorities.push("ROLE_"+ user.roles[index].name.toUpperCase()); 
        }
        res.status(200).send({
            id:user._id,
            username:user.name,
            email:user.email,
            roles:authorities,
            accessToken:token
        });
    });


    // ROles 
    // User Search
    // JWT -->
}



// MVC=> Model [View] Controller 
