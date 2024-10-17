import Offer from "../../models/Offer";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const offer = await Offer.findById(id).populate('businessId');

        if (!offer) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Offer not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(offer),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving offer', error }),
        };
    }
};