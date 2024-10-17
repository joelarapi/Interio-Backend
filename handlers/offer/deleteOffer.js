import Offer from "../../models/Offer";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const deletedOffer = await Offer.findByIdAndDelete(id);

        if (!deletedOffer) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Offer not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Offer deleted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting offer', error }),
        };
    }
};