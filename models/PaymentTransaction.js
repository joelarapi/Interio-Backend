import mongoose from "mongoose";
import SubscriptionPlan from "./SubscriptionPlan.js";

const paymentTransactionSchema = new mongoose.Schema({
    businessId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Business' },
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: true },
    amount: { type: Number},
    status: { type: String, enum: ['pending', 'completed', 'failed'], required: true },
    paymentMethod: { type: String, enum: ['credit', 'debit', 'paypal'], required: true },
    transactionId: { type: String, required: true },
    failureReason: { type: String },
    createdAt: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now }
});

paymentTransactionSchema.pre("save", async function(next){
    this.lastModified = Date.now();

    if (this.isNew || this.isModified("subscriptionId")) {
        try {
            const subscriptionPlan = await SubscriptionPlan.findById(this.subscriptionId);
            if (subscriptionPlan) {
                if (this.amount !== subscriptionPlan.price) {
                    this.amount = subscriptionPlan.price;
                }
            } else {
                throw new Error('Subscription Plan not found');
            }
        } catch (err) {
            next(err);
        }
    }
    
    next();
});

const PaymentTransaction = mongoose.model('PaymentTransaction', paymentTransactionSchema);
export default PaymentTransaction;