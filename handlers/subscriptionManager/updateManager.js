import SubscriptionManager from "../../models/SubscriptionManager";

export const handler = async (event) => {
    const { id } = event.pathParameters;
    const updateData = JSON.parse(event.body);

    try {
        const updatedManager = await SubscriptionManager.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedManager) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Subscription Manager not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(updatedManager),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating subscription manager', error }),
        };
    }
};