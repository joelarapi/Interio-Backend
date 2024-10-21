import Business from "../../models/Business.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const { name } = event.queryStringParameters || {};

    if (!name) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Name is required' }),
            headers: {
                "Access-Control-Allow-Origin": '*'
            }
        };
    }

    try {
        await connectDB();
        const businesses = await Business.find({ businessName: { $regex: name, $options: 'i' } });
        if (businesses.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No businesses found with that name' }),
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
            body: JSON.stringify({ message: 'Error retrieving businesses', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};