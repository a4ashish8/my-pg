const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ["Admin", "Accounts", "Users"],
        required: true,
    },
    userStatus: {
        type: String,
        enum: ["Active", "Deactive"],
        required: true,
    },
    userDetails:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userDetail",
    },
})
module.exports = mongoose.model("Admin", adminSchema);