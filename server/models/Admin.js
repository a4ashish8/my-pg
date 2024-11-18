const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const { userRegTemplate } = require("../mail/templates/userReg");

const adminSchema = new mongoose.Schema({
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
    userDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userDetail",
    },
});

// Post-save hook to send email after a new document is saved
adminSchema.post('save', async function (doc) {
    try {
        await doc.populate('userDetails');
        if (!doc.userDetails || !doc.userDetails.emailId) {
            console.error("User details or email not found.");
            return;
        }
        const email = doc.userDetails.emailId;
        const title = 'Welcome to the Platform!';
        const body  = userRegTemplate(email, doc.userId);
        
        await mailSender(email, title, body);
    } catch (error) {
        console.error("Error in post-save hook:", error);
    }
});

module.exports = mongoose.model("Admin", adminSchema);