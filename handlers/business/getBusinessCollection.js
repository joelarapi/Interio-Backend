import Business from "../../models/Business";

export const handler = async (event) => {
    const { businessId } = event.pathParameters;

    try {
        const business = await Business.findById(businessId).populate('collection');
        if (!business) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Business not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(business.collection),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving business collection', error }),
        };
    }
};