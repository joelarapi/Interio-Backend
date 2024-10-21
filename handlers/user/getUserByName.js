import User from "../../models/User.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const { username } = event.queryStringParameters || {};

    // Check if username is provided
    if (!username) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Username is required' }),
            headers: {
                "Access-Control-Allow-Origin": '*'
            }
        };
    }

    try {
        await connectDB();
        const users = await User.find({ username: { $regex: username, $options: 'i' } });
        
        if (users.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No users found with that name' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*',
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,username"
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(users),
            headers: {
                "Access-Control-Allow-Origin" : '*',
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,username"
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching user', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*',
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,username"
             }
        };
    }
};