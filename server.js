// server custom -->> Apche , Ngix

const express = require("express")
// CORS -> 8080   ->   8081
const cors = require("cors")
// bodyParser to parse the body of the request 
const bodyparser= require("body-parser")


const app = express()
app.use(bodyparser.json())
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// origin:"http://localhost:80"
// origin:"http://localhost"

var corsOption={
    origin:"http://localhost:8081"
}

app.use(cors(corsOption))

// JSON -->



app.get("/", (resq, res)=>{
    res.json({
        message:"Welcome to my backend"
    });
});


const dbConfig= require('./app/config/db.config') 
const db = require('./app/models')
const Role= db.Role

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Successfully Connected to MOngoDB");
    boostrap();
})
.catch(error=>{
    console.error("COnnection Error",err);
    process.exit();
});


function boostrap(){
    Role.estimatedDocumentCount((err,count)=>{
        if(!err && count ===0){
            new Role({
                name:"learner"
            }).save(err=>{
                if(err){
                    console.error("Error in learner role creation "+ err)
                }
                console.log("added 'Learner' to roles collection")
            });

            new Role({
                name:"admin"
            }).save(err=>{
                if(err){
                    console.error("Error in Admin role creation "+ err)
                }
                console.log("added 'Admin' to roles collection")
            });

            new Role({
                name:"instructor"
            }).save(err=>{
                if(err){
                    console.error("Error in instructor role creation "+ err)
                }
                console.log("added 'instructor' to roles collection")
            });
        }
    })
}


const PORT =8080

app.listen(PORT, ()=>{
    console.log(`Server is listening at PORT ${PORT}`);
})

