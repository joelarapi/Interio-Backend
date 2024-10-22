import mongoose from "mongoose";
import SubscriptionPlan from "./SubscriptionPlan.js";

const subscriptionManagerSchema = new mongoose.Schema({
    businessId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business', unique: true },
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'SubscriptionPlan' },
    startDate: { type: Date, default: Date.now },
    endDate: { 
        type: Date, 
        default: function() {
            const startDate = this.startDate || new Date();
            const endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 1);  // 1 month from the start date
            return endDate;
        }
    },
    offerNumberLimit: { type: Number },
    offerNumberCount: { type: Number, default: 0 },
    setAutoRenew: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
});

subscriptionManagerSchema.pre("save", async function(next) {
    if (this.isNew || this.isModified("subscriptionId")) {
        try {
            const subscriptionPlan = await SubscriptionPlan.findById(this.subscriptionId);
            if (subscriptionPlan) {
                this.offerNumberLimit = subscriptionPlan.offersNumber;
            } else {
                throw new Error('Subscription Plan not found');
            }
        } catch (err) {
            next(err);
        }
    }
    next();
});

const SubscriptionManager = mongoose.model('SubscriptionManager', subscriptionManagerSchema);
export default SubscriptionManager;