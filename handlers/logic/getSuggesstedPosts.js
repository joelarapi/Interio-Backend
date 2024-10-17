import Business from "../../models/Business";
import Post from "../../models/Post";

export const handler = async (event) => {
    const { businessId } = event.pathParameters;

    try {
        const business = await Business.findById(businessId).populate('category');

        if (!business) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Business not found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        const categories = business.category;

        const suggestedPosts = await Post.find({ category: { $in: categories } }).populate('category offers');

        return {
            statusCode: 200,
            body: JSON.stringify(suggestedPosts),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving suggested posts', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};