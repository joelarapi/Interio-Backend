import Message from "../../models/Message";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const message = await Message.findById(id);
        if (!message) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Message not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(message),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving message', error }),
        };
    }
};