import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    cognitoId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String, default: null },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    phoneNumber: { type: String },
    location: { type: String, default: null },
    isAdmin: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now }
});

userSchema.pre("save", async function(next){
    this.lastModified = Date.now();
    next();
});

const User = mongoose.model('User', userSchema);
export default User;