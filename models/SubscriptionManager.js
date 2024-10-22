import mongoose from "mongoose";

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

const SubscriptionManager = mongoose.model('SubscriptionManager', subscriptionManagerSchema);
export default SubscriptionManager;