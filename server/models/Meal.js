const mongoose = require("mongoose");

const mealSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
    date: {
        type: Date,
        default: Date.now
    },
    breakfast: {
        type: String,
        require: true,
    },
    lunch: {
        type: String,
        require: true,
    },
    dinner: {
        type: String,
        require: true,
    }
})
module.exports = mongoose.model("Meal",mealSchema);