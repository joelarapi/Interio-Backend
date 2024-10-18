import mongoose from "mongoose";

const FinishedJobsSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
    businessId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business' },
    rating: { type: Number },
    review: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const FinishedJobs = mongoose.model('FinishedJobs', FinishedJobsSchema);
export default FinishedJobs;