import FinishedJobs from "../../models/FinishedJobs";
import connectDB from "../../configurations/connectDB";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const finishedJobs = await FinishedJobs.findById(id).populate('postId').populate('businessId');
        if (!finishedJobs) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Job listing not found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(finishedJobs),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving job listing', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};