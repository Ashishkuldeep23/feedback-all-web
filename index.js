const express = require("express")
const mongooose = require("mongoose")
const cors = require('cors')

const route = require("./src/Router/router")
const app = express()
app.use(express.json())

 
app.use(cors())     // // // Making cors polic active


require('dotenv').config()  // // // Access .env filed


mongooose.connect( process.env.Token)
.then( ()=>{console.log("MongoDB Connected")} )
.catch((e)=>{console.log("Erro :-",e)})

app.use("/" , route)

app.get("/" , (req , res)=>{
    res.status(200).send({status : true , message : "Right request contact to Ashish on ashishkuldeep6@gmail.com this mail i'd."})
})

app.use( (req ,res) => {
    res.status(404).send({status : false , message :`Page Not Found , Given URL ${req.url} is incorrect for this application.`})
})


const port = process.env.PORT || 3000
app.listen(port, function () {
    console.log('Express app running on port ' + port)
});

