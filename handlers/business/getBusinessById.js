import Business from "../../models/Business";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const business = await Business.findById(id).populate('category');

        if (!business) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Business not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(business),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving business', error }),
        };
    }
};