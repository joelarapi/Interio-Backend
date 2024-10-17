import User from "../../models/User";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const user = await User.findById(id);
        if (!user) {
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
            body: JSON.stringify(user),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving user', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};