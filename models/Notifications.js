import mongoose from "mongoose";

const notificationsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userType: { type: String, enum: ['User', 'Business'], required: true },
    type: { type: String, enum: ['offer', 'post', 'message', 'comment', 'info'], required: true, default: 'info' },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notifications', notificationsSchema);
export default Notification;