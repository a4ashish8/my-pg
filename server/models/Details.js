const mongoose = require("mongoose");
const detailsSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    ammount: {
        type: Number,
        required: true,
    },
    phoneNo: {
        type: Number,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
    },
    joiningDate: {

        type: Date,
        default: Date.now

    },
    Image: {
        type: String,
        required: true,
    }
})
module.exports = mongoose.model("userDetail",detailsSchema)