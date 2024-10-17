import SubscriptionManager from "../../models/SubscriptionManager";

export const handler = async (event) => {
    const subscriptionData = JSON.parse(event.body);

    try {
        const newSubscriptionManager = new SubscriptionManager(subscriptionData);
        await newSubscriptionManager.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newSubscriptionManager),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating subscription manager', error }),
        };
    }
};