import SubscriptionManager from "../../models/SubscriptionManager";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const subscriptionManager = await SubscriptionManager.findById(id);
        if (!subscriptionManager) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Subscription manager not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(subscriptionManager),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving subscription manager', error }),
        };
    }
};