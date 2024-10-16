import mongoose from "mongoose";

const notificationsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    type: { type: String, enum: ['offer', 'post', 'message', 'comment', 'review'], required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    link: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notifications', notificationsSchema);
export default Notification;