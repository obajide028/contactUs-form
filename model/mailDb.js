const mongoose = require('mongoose');


const mailDetails = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    phone: {
        type: String,
        required: [true, "Please provide a Phone Number"],
        maxlength: [15, "Please provide a valid Phone Number"],
        match: [
          /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/,
          "Please provide a valid Phone Number",
        ],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ],
    },
    subject: {
        type: String,
        required: [true, "Please provide a subject"],
        maxlength: [50, "Subject cannot be more than 50 characters"]
    },
    message: {
        type: String,
        required: [true, 'Please add a message'],
        maxlength: [500, 'Message can not be more than 500 characters']
    }

});





module.exports = mongoose.model('mailDb', mailDetails);