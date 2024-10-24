import User from "../../models/User.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const { id } = event.pathParameters;
    const userData = JSON.parse(event.body);

    try {
        await connectDB();
        const updatedUser = await User.findByIdAndUpdate(id, userData, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(updatedUser),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating user', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};