import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
    authorId: { type: mongoose.Schema.Types.ObjectId, required: true },
    authorType: { type: String, enum: ['User', 'Business'], required: true },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;