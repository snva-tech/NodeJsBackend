const { authJwt }= require('../middlewares')
// destructuing

const controller= require('../controlles/user.controller')

module.exports= function (app){
    app.use(function(req,res,next){
       res.header(
        "Access-Control-Allow-Headers","x-access-token","Content-Type","Accept","Origin"
       )
       next();
    });
    // public access point
    app.get("/api/test/all",
    controller.allAccess
    );

    app.get("/api/test/learner",[authJwt.verifyToken],controller.learnerBoard);

    app.get("/api/test/admin",[authJwt.verifyToken, authJwt.isAdmin],controller.adminBoard);
};

