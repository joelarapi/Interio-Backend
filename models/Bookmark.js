import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    businessId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business' },
    postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
    createdAt: { type: Date, default: Date.now }
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;