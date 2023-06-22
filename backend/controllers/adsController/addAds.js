const moment = require("moment");
const AdsModel = require("../../models/adsModel");
const {httpStatus} = require("../../config/HttpErrors");

const addAds = (req,res) => {
    const {_id: userId} = req.locals;
    let {startDate, endDate,...reqBody} = req.body;
    startDate = new Date(moment(startDate).format("YYYY-MM-DD"))
    endDate = new Date(moment(endDate).format("YYYY-MM-DD"))
    let newAds = new AdsModel({...reqBody,startDate,endDate, userId});
    newAds.save().then(ads => {
        if (ads) {
            res.send(ads)
        } else {
            res.status(httpStatus.SERVICE_ERROR.status).send({error: "Ads is not saved to database."})
        }
    }). catch(error => {
        res.status(httpStatus.SERVICE_ERROR.status).send({error: error.message})
    })
}

module.exports = addAds;