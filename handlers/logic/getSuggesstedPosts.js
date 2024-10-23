import Business from "../../models/Business.js";
import Post from "../../models/Post.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();

        const business = await Business.findById(id);

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

        if (!categories || categories.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No categories found for this business' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                }
            };
        }

        // Find suggested posts based on business's categories
        const suggestedPosts = await Post.find({ category: { $in: categories } });

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