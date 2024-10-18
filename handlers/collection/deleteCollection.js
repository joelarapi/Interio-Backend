import Collection from "../../models/Collection";
import connectDB from "../../configurations/connectDB";


export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const deletedCollection = await Collection.findByIdAndDelete(id);

        if (!deletedCollection) {
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
            body: JSON.stringify({ message: 'Collection deleted successfully' }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting collection', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};