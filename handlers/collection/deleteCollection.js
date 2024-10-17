import Collection from "../../models/Collection";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const deletedCollection = await Collection.findByIdAndDelete(id);

        if (!deletedCollection) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Collection not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Collection deleted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting collection', error }),
        };
    }
};