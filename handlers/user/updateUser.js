import User from "../../models/User";

export const updateUser = async (event) => {
    const { id } = event.pathParameters;
    const userData = JSON.parse(event.body);

    try {
        const updatedUser = await User.findByIdAndUpdate(id, userData, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(updatedUser),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating user', error }),
        };
    }
};