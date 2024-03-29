const mongooose = require("mongoose")
const moment = require("moment")


// // // This function will checks data is valid or not ---------->
function isValidEntry(value) {
    if (value == undefined, value == null) return false
    if (typeof value == "string" && value.trim().length == 0) return false
    return true
}



// // //<----------------** Avilable model names are **--------->

const model1 = "intern"
const model2 = "smallProjectsFeed"
const model3 = "smallReact1"
const model4 = "getFood"
const model5 = "ecommerce"
const model6 = "next"
const model7 = "next2"


// // // <-----------------------** Schema and model here **-------------------->

const feedbackSchema = new mongooose.Schema(
    {
        feedbackName: { type: String, required: true, default: "Guest", trim: true },

        feedbackType: { type: String, required: true, default: "Feedback", trim: true },

        feedbackMsg: { type: String, required: true, trim: true },

        whenCreated: { type: String, trim: true },

        feedFromWebName: { type: String, required: true, trim: true },

        reply: { type: String, default: "Thank You!", trim: true }

    }, { timestamps: true })

// // // //<-----------------------** All models with one schema to seprate feedbacks **----------->
let InternFeedbackModel = mongooose.model(model1, feedbackSchema)
let smallProjectsModel = mongooose.model(model2, feedbackSchema)
let smallReact1sModel = mongooose.model(model3, feedbackSchema)
let getFoodModel = mongooose.model(model4, feedbackSchema)
let ecommerceModel = mongooose.model(model5, feedbackSchema)
let nextModel = mongooose.model(model6, feedbackSchema)
let next2Model = mongooose.model(model6, feedbackSchema)






// // // //<-----------------------------** Post new feedback by model name in params (To create new feedback on avilable models only) **--------------------------->

module.exports.feedbackController = async function (req, res) {

    const feedbackNameReg = (/^([A-Za-z ]+){3,}$/)

    // // // Model entry checks here --->
    let modelName = req.params.modelName
    if (!modelName) return res.status(500).send({ status: false, message: "Model name is not given in path params.(forntEnd error)" })

    let listOfAllModel = [model1, model2, model3, model4, model5, model6, model7]
    if (!listOfAllModel.includes(modelName)) return res.status(500).send({ status: false, message: `Given Model Name(${modelName}) is Invalid.(FrontEnd Error)` })


    // // // All data given in body --->
    // // // feedbackMsg is required field ---->
    let { feedbackName, feedbackType, feedbackMsg, feedFromWebName, whenCreated } = req.body

    // // // Feedback Name enrty checks here -->
    // // if (!isValidEntry(feedbackName)) return res.status(400).send({ status: false, message: `Feedback Name is not given.` }) // // Now name is Guest By Default. 

    if (!feedbackName) {
        req.body.feedbackName = "Guest"
    }

    if (feedbackName) {
        if (!feedbackNameReg.test(feedbackName)) return res.status(400).send({ status: false, message: `Feedback Name is invalid.(${feedbackName})` })
    }

    // // // Feedback msg enrty checks here -->
    if (!isValidEntry(feedbackMsg)) return res.status(400).send({ status: false, message: "Feedback Messege is not given." })

    // // // Feedback type controlled by schema if not given.


    // // // Time according to deployed time zone (utcoffset() is give time acc. to time zone , so we will set is on indian time zone by "+05:30" ) ------------>
    if (!whenCreated) {
        req.body.whenCreated = moment().utcOffset("+05:30").format('MMMM Do YY, hh:mm a')
    }


    // // // Website Url or site name ------>

    if (!feedFromWebName) {
        req.body.feedFromWebName = modelName
    }


    // // // Var to store output of creation -->
    let data = ''
    if (modelName == model1) {
        data = await InternFeedbackModel.create(req.body)
    }
    if (modelName == model2) {
        data = await smallProjectsModel.create(req.body)
    }
    if (modelName == model3) {
        data = await smallReact1sModel.create(req.body)
    }
    if (modelName == model4) {
        data = await getFoodModel.create(req.body)
    }
    if (modelName == model5) {
        data = await ecommerceModel.create(req.body)
    }
    if (modelName == model6) {
        data = await nextModel.create(req.body)
    }
    if (modelName == model7) {
        data = await next2Model.create(req.body)
    }

    res.status(201).send({ status: true, message: "FeedBack crearted successfully", data: data })
}





// // // // <-------------------------------** Get all feebacks by model name in params **-------------------------------->

module.exports.getFeedbackAll = async function (req, res) {

    let modelName = req.params.modelName

    let listOfAllModel = [model1, model2, model3, model4, model5]
    if (!listOfAllModel.includes(modelName)) return res.status(500).send({ status: false, message: `Give Model Name(${modelName}) is Invalid.(FrontEnd Error)` })

    let data = ''
    if (modelName == model1) {
        data = await InternFeedbackModel.find().select({ feedbackName: 1, feedbackType: 1, feedbackMsg: 1, whenCreated: 1, reply: 1, _id: 0 }).sort({ createdAt: -1 })
    }
    if (modelName == model2) {
        data = await smallProjectsModel.find().select({ feedbackName: 1, feedbackType: 1, feedbackMsg: 1, whenCreated: 1, reply: 1, _id: 0 }).sort({ createdAt: -1 })
    }
    if (modelName == model3) {
        data = await smallReact1sModel.find().select({ feedbackName: 1, feedbackType: 1, feedbackMsg: 1, whenCreated: 1, reply: 1, _id: 0 }).sort({ createdAt: -1 })
    }
    if (modelName == model4) {
        data = await getFoodModel.find().select({ feedbackName: 1, feedbackType: 1, feedbackMsg: 1, whenCreated: 1, reply: 1, _id: 0 }).sort({ createdAt: -1 })
    }
    if (modelName == model5) {
        data = await ecommerceModel.find().select({ feedbackName: 1, feedbackType: 1, feedbackMsg: 1, whenCreated: 1, reply: 1, _id: 0 }).sort({ createdAt: -1 })
    }
    if (modelName == model6) {
        data = await nextModel.find().select({ feedbackName: 1, feedbackType: 1, feedbackMsg: 1, whenCreated: 1, reply: 1, _id: 0 }).sort({ createdAt: -1 })
    }
    if (modelName == model7) {
        data = await next2Model.find().select({ feedbackName: 1, feedbackType: 1, feedbackMsg: 1, whenCreated: 1, reply: 1, _id: 0 }).sort({ createdAt: -1 })
    }


    if (data.length <= 0) {
        return res.status(404).send({ status: false, message: "No feedback found for now. Give first feedback by filling the form." })
    }


    res.status(200).send({ status: true, message: "All feedbacks fetched successfully", data: data })

}