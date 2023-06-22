const {httpStatus} = require("../../config/HttpErrors");
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY);
const paymentInit = (req,res)=>{
    stripe.paymentIntents.create({
        amount:req.body.price,
        currency:req.body.currency,
        automatic_payment_methods:{enabled:true}
    }).then(paymentIntents => {
        res.send(paymentIntents.client_secret)
    }).catch(error => {
        res.status(httpStatus.SERVICE_ERROR.status)
            .send({error:error.message})
    })


}

module.exports = paymentInit