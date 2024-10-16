import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    cognitoId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String },
    location: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now }
});

adminSchema.pre("save", async function(next){
    this.lastModified = Date.now();
    next();
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;