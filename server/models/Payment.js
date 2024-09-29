const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({

    duesMonth: {
        type: Number,
        require: true,
    },
    duesYear: {
        type: Number,
        require: true,
    },
    collector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
    paymentAmmount: {
        type: Number,
        require: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
    paymentDate: {
        type: Date,
        // default: Date.now,
    },
    createdAt: {
        type: Date,
        // default: Date.now,
    },
    ammountPaid: {
        type: Number,
        require: true,
    },
    duesAmmount: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        enum: ["Approved", "Deny", "Paid", "Pending"],
        required: true,
    },

});
module.exports = mongoose.model("Payment", paymentSchema)