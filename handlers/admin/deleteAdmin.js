import Admin from "../../models/Admin";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const deletedAdmin = await Admin.findByIdAndDelete(id);

        if (!deletedAdmin) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Admin not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Admin deleted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting admin', error }),
        };
    }
};