import Post from "../../models/Post.js";
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
            filters.category = { $in: categoriesArray };
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

        try {
            await filteredPosts.populate('category');
        } catch (populateError) {
            console.error("Error populating category:", populateError);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error during category population', error: populateError.message }),
                headers: {
                    "Access-Control-Allow-Origin": '*'
                }
            };
        }

        try {
            await filteredPosts.populate('offers');
        } catch (populateError) {
            console.error("Error populating bookmarks:", populateError);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Error during bookmarks population', error: populateError.message }),
                headers: {
                    "Access-Control-Allow-Origin": '*'
                }
            };
        }

        if (filteredPosts.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No posts found with the given filters' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(filteredPosts),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving filtered posts', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};