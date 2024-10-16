import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    cognitoId: { type: String, required: true, unique: true },
    businessName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    phoneNumber: { type: String },
    profilePicture: { type: String, default: null },
    location: { type: String, default: null },
    rating: { type: Number, default: 0 },
    description: { type: String, default: null },
    websiteLink: { type: String },
    collection: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collection' }],
    availableOfferNumber: { type: Number, default: 5 },
    subscriptionPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan' },
    offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' }],
    bookmark: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bookmark' }],
    createdAt: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now }
});

businessSchema.pre("save", async function(next){
    this.lastModified = Date.now();
    next();
});

const Business = mongoose.model('Business', businessSchema);
export default Business;