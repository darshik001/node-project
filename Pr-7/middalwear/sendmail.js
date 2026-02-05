const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service:"gmail",
    port:587,
    secure:false,
    auth:{
        user:'darshikshekhada07@gmail.com',
        pass:'ambjpqbvhxdcnrws'
    }
})


const sendMail = async(message)=>{
    let respons  = await transport.sendMail(message)
    console.log(respons)
}


module.exports = sendMail