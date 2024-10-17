import AdditionalOffers from "../../models/AdditionalOffers";

export const handler = async (event) => {
    const additionalOfferData = JSON.parse(event.body);

    try {
        const newAdditionalOffer = new AdditionalOffers(additionalOfferData);
        await newAdditionalOffer.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newAdditionalOffer),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating additional offer', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};