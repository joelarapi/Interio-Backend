import Notification from "../../models/Notifications.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const updatedNotification = await Notification.findByIdAndUpdate(
            id,
            { isRead: true },
            { new: true }
        );

        if (!updatedNotification) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Notification not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(updatedNotification),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error marking notification as read', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};