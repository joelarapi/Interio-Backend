import SubscriptionManager from "../../models/SubscriptionManager";
import connectDB from "../../configurations/connectDB";

export const handler = async (event) => {
    const { businessId } = event.pathParameters;

    try {
        await connectDB();
        const subscriptionManager = await SubscriptionManager.findOne({ businessId });
        
        if (!subscriptionManager) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Subscription manager not found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(subscriptionManager),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving subscription manager', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};