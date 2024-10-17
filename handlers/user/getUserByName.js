import User from "../../models/User";

export const handler = async (event) => {
    const { username } = event.pathParameters;

    try {
        const users = await User.find({ username: { $regex: username, $options: 'i' } });
        
        if (users.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'No users found with that name' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(users),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching user', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};