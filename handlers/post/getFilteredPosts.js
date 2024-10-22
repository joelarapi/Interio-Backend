import Post from "../../models/Post.js";
import Category from "../../models/Categories.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const { locations, categories, minBudget, maxBudget, daysAgo } = event.queryStringParameters || {};

    try {
        await connectDB();

        const filters = {};

        if (locations) {
            const locationsArray = locations.split(',');
            filters.location = { $in: locationsArray.map(location => new RegExp(location, 'i')) };
        }

        if (categories) {
            const categoriesArray = categories.split(',');
            const categoryDocs = await Category.find({ name: { $in: categoriesArray } });
            const categoryIds = categoryDocs.map(cat => cat._id);
            filters.category = { $in: categoryIds };
        }

        if (minBudget || maxBudget) {
            filters.budget = {};
            if (minBudget) filters.budget.$gte = Number(minBudget);
            if (maxBudget) filters.budget.$lte = Number(maxBudget);
        }

        if (daysAgo) {
            const dateLimit = new Date();
            dateLimit.setDate(dateLimit.getDate() - Number(daysAgo));
            filters.createdAt = { $gte: dateLimit };
        }

        const filteredPosts = await Post.find(filters);

        if (!filteredPosts || filteredPosts.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No posts found with the given filters' }),
                headers: {
                    "Access-Control-Allow-Origin": '*'
                }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(filteredPosts),
            headers: {
                "Access-Control-Allow-Origin": '*'
            }
        };

    } catch (error) {
        console.error("Error retrieving filtered posts:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving filtered posts', error: error.message }),
            headers: {
                "Access-Control-Allow-Origin": '*'
            }
        };
    }
};