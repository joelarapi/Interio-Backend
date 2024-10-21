import mongoose from "mongoose";
import Offer from "../../models/Offer.js";
import connectDB from "../../configurations/connectDB.js";
import Business from "../../models/Business.js";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid offer ID' }),
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            };
        }

        const offer = await Offer.findById(id).populate('businessId');

        if (!offer) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Offer not found' }),
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(offer),
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };
    } catch (error) {
        
        console.error('Error retrieving offer:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving offer', error: error.message || error }),
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };
    }
};
