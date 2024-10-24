import Business from "../../models/Business.js";
import connectDB from "../../configurations/connectDB.js";
import Post from  "../../models/Post.js"

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        console.log(id);
        await connectDB();
        //const business = await Business.findById(id).populate('category bookmarks showroom');
        const business = await Business.findById(id);
        
        if (!business) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Business not found' }),
                headers: {
                    "Access-Control-Allow-Origin": '*'
                }
            };
        }

        try {
            await business.populate('category');
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
            await business.populate('bookmarks');
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

        return {
            statusCode: 200,
            body: JSON.stringify(business),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving business', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};