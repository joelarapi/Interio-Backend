import Notification from "../../models/Notifications";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
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
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error marking notification as read', error }),
        };
    }
};