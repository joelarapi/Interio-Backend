import SubscriptionPlan from "../../models/SubscriptionPlan";

export const hanlder = async (event) => {
    const { id } = event.pathParameters;

    try {
        const subscriptionPlan = await SubscriptionPlan.findById(id);
        if (!subscriptionPlan) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Subscription plan not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(subscriptionPlan),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving subscription plan', error }),
        };
    }
};