
// // // Below function to check cors policy (frontEnd url is noted or not.)

function globalMWAsCors(req, res, next) {

    // // // Making url withou params --->
    let requestUrl =  req.protocol + '://' + req.get('host')

    // // // List of all url that deployed and ready to take feedback --->
    var whitelist = ['https://internscity.onrender.com', 'https://my-todo-zm4b.onrender.com' , "https://feedback-hzwx.onrender.com" ]

    if(whitelist.includes(requestUrl)){
        next()
    }else{
        res.status(400).send({status:false , message : "Hey Mr. yor are not allowed.(Cors policy error ask to Fronend Developer)" })
    }


}



module.exports = { globalMWAsCors }