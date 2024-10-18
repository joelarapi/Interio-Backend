import Offer from "../../models/Offer";
import connectDB from "../../configurations/connectDB";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const offer = await Offer.findById(id).populate('businessId');

        if (!offer) {
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
            body: JSON.stringify(offer),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving offer', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};