import mongoose from "mongoose";

const additionalOffersSchema = new mongoose.Schema({
    price: { type: Number, required: true },
    offersNumber: { type: Number, required: true }
});

const AdditionalOffers = mongoose.model('AdditionalOffers', additionalOffersSchema);
export default AdditionalOffers;