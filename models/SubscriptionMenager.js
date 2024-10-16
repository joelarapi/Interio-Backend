import mongoose from "mongoose";

const subscriptionMenagerSchema = new mongoose.Schema({
    businessId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business' },
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'SubscriptionPlan' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    offerNumberLimit: { type: Number },
    offerNumberCount: { type: Number, default: 0 },
    setAutoRenew: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

const SubscriptionMenager = mongoose.model('SubscriptionMenager', subscriptionMenagerSchema);
export default SubscriptionMenager;