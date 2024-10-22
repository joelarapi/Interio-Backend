import Message from "../../models/Message.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const updatedMessage = await Message.findByIdAndUpdate(
            id,
            { isRead: true },
            { new: true }
        );

        if (!updatedMessage) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Message not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(updatedMessage),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error marking message as read', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};