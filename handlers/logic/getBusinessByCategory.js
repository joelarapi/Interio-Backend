import Business from "../../models/Business.js";
import Category from "../../models/Category.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const { category } = event.pathParameters;

    try {
        await connectDB();
        const categoryData = await Category.findOne({ name: { $regex: category, $options: 'i' } });
        
        if (!categoryData) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No category found with that name' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        const businesses = await Business.find({ category: categoryData._id });

        if (businesses.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No businesses found in that category' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(businesses),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving businesses by category', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};