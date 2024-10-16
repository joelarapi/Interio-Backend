import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    content: { type: String },
    location: { type: String, required: true },
    images: [{ type: String }],
    budget: { type: Number },
    items: [{
        name: { type: String, required: true },
        measurements: { type: String }
    }],
    jobListing: { type: mongoose.Schema.Types.ObjectId, ref: 'JobListing' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' }],
    status: { type: String, enum: ['open', 'closed', 'completed'], default: 'open' },
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);
export default Post;