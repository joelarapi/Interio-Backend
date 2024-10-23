import Offer from '../../models/Offer.js';
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const offers = await Offer.find({ postId: id });

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