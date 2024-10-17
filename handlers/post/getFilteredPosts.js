import Post from "../../models/Post";

export const handler = async (event) => {
    const { locations, categories, minBudget, maxBudget, minOffers, maxOffers } = event.queryStringParameters || {};

    try {
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

        if (minOffers || maxOffers) {
            filters.offers = { $size: {} };
            if (minOffers) filters.offers.$size.$gte = Number(minOffers);
            if (maxOffers) filters.offers.$size.$lte = Number(maxOffers);
        }

        const filteredPosts = await Post.find(filters).populate('category offers');

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