import Business from "../../models/Business";

export const handler = async (event) => {
    const { name } = event.pathParameters;

    try {
        const businesses = await Business.find({ businessName: { $regex: name, $options: 'i' } });
        if (businesses.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No businesses found with that name' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(businesses),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving businesses', error }),
        };
    }
};