const router = require("express").Router()

let {feedbackController} = require("../Controller/controller")

router.post("/newFeedback" , feedbackController)

router.get("*" , )

module.exports = router