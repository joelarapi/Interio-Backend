import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    businessId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business' },
    image: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Collection = mongoose.model('Collection', collectionSchema);
export default Collection;