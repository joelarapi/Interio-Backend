import Offer from "../../models/Offer";
import connectDB from "../../configurations/connectDB";

export const handler = async (event) => {
    const offerData = JSON.parse(event.body);

    try {
        await connectDB();
        const newOffer = new Offer(offerData);
        await newOffer.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newOffer),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating offer', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};