import SubscriptionManager from "../../models/SubscriptionManager.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const { id } = event.pathParameters;
    const updateData = JSON.parse(event.body);

    try {
        await connectDB();
        const updatedManager = await SubscriptionManager.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedManager) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Subscription Manager not found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(updatedManager),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating subscription manager', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};