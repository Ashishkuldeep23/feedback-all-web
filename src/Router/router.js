const router = require("express").Router()

let {feedbackController , getFeedbackAll} = require("../Controller/controller")

router.post("/newFeedback" , feedbackController)

router.get("/getFeedback/:modelName" , getFeedbackAll)


module.exports = router