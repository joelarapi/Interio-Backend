import Collection from "../../models/Collection";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const collection = await Collection.findById(id).populate('businessId');
        
        if (!collection) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Collection not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(collection),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving collection', error }),
        };
    }
};