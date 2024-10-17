import SubscriptionPlan from "../../models/SubscriptionPlan";

export const handler = async (event) => {
    const subscriptionPlanData = JSON.parse(event.body);

    try {
        const newSubscriptionPlan = new SubscriptionPlan(subscriptionPlanData);
        await newSubscriptionPlan.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newSubscriptionPlan),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating subscription plan', error }),
        };
    }
};