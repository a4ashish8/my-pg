const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: false,
    },
 
  
});


module.exports = mongoose.model("Comment", commentSchema);