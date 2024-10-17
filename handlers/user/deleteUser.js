import User from "../../models/User";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'User not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User deleted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting user', error }),
        };
    }
};