import AdditionalOffers from "../../models/AdditionalOffers";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const additionalOffer = await AdditionalOffers.findById(id);
        if (!additionalOffer) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Additional offer not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(additionalOffer),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving additional offer', error }),
        };
    }
};