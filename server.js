// server custom -->> Apche , Ngix

const express = require("express")
// CORS -> 8080   ->   8081
const cors = require("cors")
// bodyParser to parse the body of the request 
const bodyparser= require("body-parser")

const app = express()

// origin:"http://localhost:80"
// origin:"http://localhost"

var corsOption={
    origin:"http://localhost:8081"
}

app.use(cors(corsOption))

// JSON -->
app.use(bodyparser.json())


app.get("/", (resq, res)=>{
    res.json({
        message:"Welcome to my backend"
    });
});


const PORT =8080

app.listen(PORT, ()=>{
    console.log(`Server is listening at PORT ${PORT}`);
})

