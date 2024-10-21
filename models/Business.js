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
    showroom: {
        type: [String],
        validate: [arrayLimit, '{PATH} exceeds the limit of 50'],
    },
    availableOfferNumber: { type: Number, default: 5 },
    subscriptionPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan' },
    offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    promos: {
        type: [String],
        upUntil: { type: Date }
    },
    createdAt: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now }
});

function arrayLimit(val) {
    return val.length <= 50;
}

businessSchema.pre("save", async function(next){
    this.lastModified = Date.now();
    next();
});

const Business = mongoose.model('Business', businessSchema);
export default Business;