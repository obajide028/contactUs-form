const mailDetails = require('../model/mailDb');
const ErrorResponse = require('../utils/customError');
const mailAttribute = require('../utils/mailing');


const contactUS = async(req, res, next) => {
    const { name, phone, email, subject, message } = req.body

  if(!name || !phone || !email || !subject || !message ){
     return (new ErrorResponse("Please Provide all input Fields", 400));
  }

  try {
    const saveUser = await mailDetails.create({name, phone, email, subject, message});
    await mailAttribute({name, phone, email, subject, message});

    return res.status(201)
               .json({success: true, message: "user saved to Db and email Sent", sender: saveUser})
  } catch (error) {
       res.status(500)
       .json({error: error.message})
  }

};


module.exports = contactUS;