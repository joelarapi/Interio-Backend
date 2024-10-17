import Business from "../../models/Business";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const deletedBusiness = await Business.findByIdAndDelete(id);

        if (!deletedBusiness) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Business not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Business deleted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting business', error }),
        };
    }
};