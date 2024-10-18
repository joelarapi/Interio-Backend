import Offer from '../../models/Offer';
import connectDB from "../../configurations/connectDB";

export const handler = async (event) => {
    const { postId } = event.pathParameters;

    try {
        await connectDB();
        const offers = await Offer.find({ postId }).populate('businessId');

        return {
            statusCode: 200,
            body: JSON.stringify(offers),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving post offers', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};