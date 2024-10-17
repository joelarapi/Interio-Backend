import AdditionalOffers from "../../models/AdditionalOffers";

export const handler = async () => {
    try {
        const additionalOffers = await AdditionalOffers.find();

        return {
            statusCode: 200,
            body: JSON.stringify(additionalOffers),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving additional offers', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};