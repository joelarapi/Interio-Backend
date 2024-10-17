import Notification from "../../models/Notifications";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const notification = await Notification.findById(id);
        if (!notification) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Notification not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(notification),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving notification', error }),
        };
    }
};