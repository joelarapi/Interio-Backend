import Message from "../../models/Message";

export const handler = async (event) => {
    const messageData = JSON.parse(event.body);

    try {
        const newMessage = new Message(messageData);
        await newMessage.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newMessage),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating message', error }),
        };
    }
};