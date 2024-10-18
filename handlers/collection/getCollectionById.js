import Collection from "../../models/Collection";
import connectDB from "../../configurations/connectDB";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const collection = await Collection.findById(id).populate('businessId');
        
        if (!collection) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Collection not found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(collection),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving collection', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};