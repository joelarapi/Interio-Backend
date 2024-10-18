import Business from "../../models/Business";
import connectDB from "../../configurations/connectDB";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const deletedBusiness = await Business.findByIdAndDelete(id);

        if (!deletedBusiness) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Business not found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Business deleted successfully' }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting business', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};