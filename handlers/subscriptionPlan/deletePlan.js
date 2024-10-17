import SubscriptionPlan from "../../models/SubscriptionPlan";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const deletedSubscriptionPlan = await SubscriptionPlan.findByIdAndDelete(id);
        if (!deletedSubscriptionPlan) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Subscription plan not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Subscription plan deleted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting subscription plan', error }),
        };
    }
};