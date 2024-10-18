import Offer from "../../models/Offer.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const deletedOffer = await Offer.findByIdAndDelete(id);

        if (!deletedOffer) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Offer not found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Offer deleted successfully' }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting offer', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};