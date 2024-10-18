import SubscriptionManager from "../../models/SubscriptionManager.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const subscriptionData = JSON.parse(event.body);

    try {
        await connectDB();
        const newSubscriptionManager = new SubscriptionManager(subscriptionData);
        await newSubscriptionManager.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newSubscriptionManager),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating subscription manager', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};