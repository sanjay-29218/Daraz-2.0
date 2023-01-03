import mongoose from 'mongoose'


const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comment:{type:String,required:true},
})
const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;