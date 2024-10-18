import Message from "../../models/Message";
import connectDB from "../../configurations/connectDB";

export const handler = async (event) => {
    const messageData = JSON.parse(event.body);

    try {
        await connectDB();
        const newMessage = new Message(messageData);
        await newMessage.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newMessage),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating message', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};