import mongoose from "mongoose";

const subscriptionPlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    offersNumber: { type: Number, required: true },
    badge: { type: String, enum: ['diamond', 'gold', 'silver']},
    setAsTopOffer: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now }
});

subscriptionPlanSchema.pre("save", async function(next){
    this.lastModified = Date.now();
    next();
});

const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
export default SubscriptionPlan;