import Business from "../../models/Business";
import Category from "../../models/Category";

export const handler = async (event) => {
    const { category } = event.pathParameters;

    try {
        const categoryData = await Category.findOne({ name: { $regex: category, $options: 'i' } });
        
        if (!categoryData) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No category found with that name' }),
            };
        }

        const businesses = await Business.find({ category: categoryData._id });

        if (businesses.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No businesses found in that category' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(businesses),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving businesses by category', error }),
        };
    }
};