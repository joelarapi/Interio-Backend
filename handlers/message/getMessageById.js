import Message from "../../models/Message.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const message = await Message.findById(id);
        if (!message) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Message not found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(message),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving message', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};