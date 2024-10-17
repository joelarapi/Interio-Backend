import Offer from "../../models/Offer";

export const handler = async (event) => {
    const offerData = JSON.parse(event.body);

    try {
        const newOffer = new Offer(offerData);
        await newOffer.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newOffer),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating offer', error }),
        };
    }
};