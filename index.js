const express = require("express")
const mongooose = require("mongoose")

const route = require("./src/Router/router")

const app = express()
app.use(express.json())


mongooose.connect( "mongodb+srv://ashishkuldeep23:RAPXp7lktCcf8jBm@cluster0.xtascce.mongodb.net/Feedback" , {
    useNewUrlParser: true
})
.then( ()=>{console.log("MongoDB Connected")} )
.catch((e)=>{console.log("Erro :-",e)})


app.use("/" , route)


const port = process.env.PORT || 3000
app.listen(port, function () {
    console.log('Express app running on port ' + port)
});
