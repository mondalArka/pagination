const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    postText: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user_registration"
    }
});




const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;