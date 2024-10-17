import Business from "../../models/Business";
import Bookmark from "../../models/Bookmark";

export const handler = async (event) => {
    const { businessId } = event.pathParameters;

    try {
        const business = await Business.findById(businessId).populate('bookmark');

        if (!business) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Business not found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(business.bookmark),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving business bookmarks', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};