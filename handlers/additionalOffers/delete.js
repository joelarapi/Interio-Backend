import AdditionalOffers from "../../models/AdditionalOffers";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const deletedAdditionalOffer = await AdditionalOffers.findByIdAndDelete(id);
        if (!deletedAdditionalOffer) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Additional offer not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Additional offer deleted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting additional offer', error }),
        };
    }
};