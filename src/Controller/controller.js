const mongooose = require("mongoose")


// // // Avilable model names are --------->

const model1 = "intern"
const model2 = "next"
const model3 = "next2"


// // // Schema and model here -------------------->

const feedbackSchema = new mongooose.Schema({

    feedbackName: { type: String, required: true },

    feedbackType: { type: String, required: true, default: "Feedback" },

    feedbackMsg: { type: String, required: true }

}, { timestamps: true }
)

// // // // All models with one schema to seprate feedbacks ----------->
let InternFeedbackModel = mongooose.model(model1, feedbackSchema)
let nextModel = mongooose.model(model2, feedbackSchema)
let next2Model = mongooose.model(model3, feedbackSchema)



// // // // Controller function (To create new feedback on avilable models only) --------------------------->

module.exports.feedbackController = async function (req, res) {

    const feedbackNameReg = (/^([A-Za-z ]+){3,}$/)
    let listOfAllModel = [model1, model2, model3]

    let { modelName, feedbackName, feedbackType, feedbackMsg } = req.body

    // // // Feedback Name enrty checks here -->
    if (!isValidEntry(feedbackName)) return res.status(400).send({ status: false, message: `Feedback Name is not given.` })
    if (!feedbackNameReg.test(feedbackName)) return res.status(400).send({ status: false, message: `Feedback Name is invalid.(${feedbackName})` })

    // // // Feedback msg enrty checks here -->
    if (!isValidEntry(feedbackMsg)) return res.status(400).send({ status: false, message: "Feedback Messege is not given." })

    // // // Model entry checks here -->
    if (!isValidEntry(modelName)) return res.status(500).send({ status: false, message: "Give Model Name.(FrontEnd Error)" })
    if (!listOfAllModel.includes(modelName)) { return res.status(500).send({ status: false, message: `Give Model Name(${modelName}) is Invalid.(FrontEnd Error)` }) }

    // // // Feedback type controlled by schema if not given.


    // // // Var to store output of creation -->
    let data = ''
    if (modelName == model1) {
        data = await InternFeedbackModel.create(req.body)
    }
    if (modelName == model2) {
        data = await nextModel.create(req.body)
    }
    if (modelName == model3) {
        data = await next2Model.create(req.body)
    }

    res.status(201).send({ status: true, message: "Data crearted successfully", data: data })
}


// // // This function will checks data is valid or not ---------->
function isValidEntry(value) {

    if (value == undefined, value == null) return false

    if (typeof value == "string" && value.trim().length == 0) return false

    return true
}