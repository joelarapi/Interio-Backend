import SubscriptionPlan from "../../models/SubscriptionPlan";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const deletedSubscriptionPlan = await SubscriptionPlan.findByIdAndDelete(id);
        if (!deletedSubscriptionPlan) {
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
            body: JSON.stringify({ message: 'Subscription plan deleted successfully' }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting subscription plan', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};