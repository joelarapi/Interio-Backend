import SubscriptionPlan from "../../models/SubscriptionPlan";
import connectDB from "../../configurations/connectDB";

export const hanlder = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const subscriptionPlan = await SubscriptionPlan.findById(id);
        if (!subscriptionPlan) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Subscription plan not found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(subscriptionPlan),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving subscription plan', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};