const { verifySignUp}= require('../middlewares')
// destructuing

const controller= require('../controlles/auth.controller')

module.exports= function (app){
    app.use(function(req,res,next){
       res.header(
        "Access-Control-Allow-Headers","x-access-token","Content-Type","Accept","Origin"
       )
       next();
    });

    app.post("/api/auth/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRoleEixisted
    ],
    controller.signup
    );

    app.post("/api/auth/signin",controller.signin);
};

