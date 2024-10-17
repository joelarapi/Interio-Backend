import Notification from "../../models/Notifications";

export const handler = async (event) => {
    const notificationData = JSON.parse(event.body);

    try {
        const newNotification = new Notification(notificationData);
        await newNotification.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newNotification),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating notification', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};