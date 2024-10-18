import SubscriptionPlan from "../../models/SubscriptionPlan.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async () => {
    try {
        await connectDB();
        const subscriptionPlans = await SubscriptionPlan.find();

        return {
            statusCode: 200,
            body: JSON.stringify(subscriptionPlans),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving subscription plans', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};