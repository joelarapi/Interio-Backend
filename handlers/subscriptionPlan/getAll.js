import SubscriptionPlan from "../../models/SubscriptionPlan";

export const handler = async () => {
    try {
        const subscriptionPlans = await SubscriptionPlan.find();

        return {
            statusCode: 200,
            body: JSON.stringify(subscriptionPlans),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving subscription plans', error }),
        };
    }
};