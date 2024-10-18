import SubscriptionPlan from "../../models/SubscriptionPlan.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const subscriptionPlanData = JSON.parse(event.body);

    try {
        await connectDB();
        const newSubscriptionPlan = new SubscriptionPlan(subscriptionPlanData);
        await newSubscriptionPlan.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newSubscriptionPlan),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating subscription plan', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};