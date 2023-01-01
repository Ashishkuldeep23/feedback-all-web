const router = require("express").Router()

let {feedbackController} = require("../Controller/controller")

router.post("/newFeedback" , feedbackController)

router.get("*" , (req ,res)=>{res.status(404).send({status : false , message : "Page Not Found"})})

module.exports = router