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
const model2 = "next"
const model3 = "next2"


// // // <-----------------------** Schema and model here **-------------------->

const feedbackSchema = new mongooose.Schema(
{
    feedbackName: { type: String, required: true ,trim : true },

    feedbackType: { type: String, required: true, default: "Feedback" ,trim : true},

    feedbackMsg: { type: String, required: true ,trim : true} ,

    whenCreated : {type : String , default : moment().format('MMMM Do YY, hh:mm a') ,trim : true} ,

    reply : {type : String , default : "Thank You!" ,trim : true} 

}, { timestamps: true })

// // // //<-----------------------** All models with one schema to seprate feedbacks **----------->
let InternFeedbackModel = mongooose.model(model1, feedbackSchema)
let nextModel = mongooose.model(model2, feedbackSchema)
let next2Model = mongooose.model(model3, feedbackSchema)






// // // //<-----------------------------** Post new feedback by model name in params (To create new feedback on avilable models only) **--------------------------->

module.exports.feedbackController = async function (req, res) {

    const feedbackNameReg = (/^([A-Za-z ]+){3,}$/)
    
    // // // Model entry checks here --->
    let modelName = req.params.modelName
    
    let listOfAllModel = [model1, model2, model3]
    if (!modelName) return res.status(500).send({status : false , message : "Model name is not given in path params.(forntEnd error)"})
    if (!listOfAllModel.includes(modelName)) return res.status(500).send({ status: false, message: `Give Model Name(${modelName}) is Invalid.(FrontEnd Error)` }) 


    // // // All data given in body --->
    let { feedbackName, feedbackType, feedbackMsg } = req.body

    // // // Feedback Name enrty checks here -->
    if (!isValidEntry(feedbackName)) return res.status(400).send({ status: false, message: `Feedback Name is not given.` })
    if (!feedbackNameReg.test(feedbackName)) return res.status(400).send({ status: false, message: `Feedback Name is invalid.(${feedbackName})` })

    // // // Feedback msg enrty checks here -->
    if (!isValidEntry(feedbackMsg)) return res.status(400).send({ status: false, message: "Feedback Messege is not given." })

    // // // Feedback type controlled by schema if not given.


    // // // Time according to deployed time zone (utcoffset() is give time acc. to time zone , so we will set is on indian time zone by "+05:30" ) ------------>
    req.body.whenCreated = moment().utcOffset("+05:30").format('MMMM Do YY, hh:mm a')


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

    res.status(201).send({ status: true, message: "FeedBack crearted successfully" , data : data})
}





// // // // <-------------------------------** Get all feebacks by model name in params **-------------------------------->

module.exports.getFeedbackAll = async function(req ,res){

    let modelName = req.params.modelName

    let listOfAllModel = [model1, model2, model3]
    if (!listOfAllModel.includes(modelName)) return res.status(500).send({ status: false, message: `Give Model Name(${modelName}) is Invalid.(FrontEnd Error)` }) 

    let data = ''
    if (modelName == model1) {
        data = await InternFeedbackModel.find().select({feedbackName : 1 , feedbackType : 1 , feedbackMsg : 1 , whenCreated : 1 , _id : 0 }).sort({createdAt : -1})
    }
    if (modelName == model2) {
        data = await nextModel.find().select({feedbackName : 1 , feedbackType : 1 , feedbackMsg : 1, whenCreated : 1 , _id : 0 }).sort({createdAt : -1})
    }
    if (modelName == model3) {
        data = await next2Model.find().select({feedbackName : 1 , feedbackType : 1 , feedbackMsg : 1 , whenCreated : 1, _id : 0 }).sort({createdAt : -1})
    }

    res.status(201).send({ status: true, message: "Fetched successfully", data: data })
   
}