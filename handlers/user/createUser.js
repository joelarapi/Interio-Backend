import User from "../../models/User.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Request body is required' }),
            headers: {
                "Access-Control-Allow-Origin": '*'
            }
        };
    }
    const userData = JSON.parse(event.body);

    try {
        await connectDB();
        const newUser = new User(userData);
        await newUser.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newUser),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating user', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};