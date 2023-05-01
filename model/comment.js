const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const commentSchema = new Schema({
    comment:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
    post: {
        type: Schema.Types.ObjectId,
        ref: "post"
    },user:{
        type: Schema.Types.ObjectId,
        ref: "user_registration"  
    },status:{
        type:Boolean,
        default:false
    }
});




const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;