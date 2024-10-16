import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' },
    businessId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business' },
    price: { type: Number, required: true },
    message: { type: String },
    status: { type: String, enum: ['pending', 'accepted', 'rejected', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const Offer = mongoose.model('Offer', offerSchema);
export default Offer;