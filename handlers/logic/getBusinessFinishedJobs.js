import FinishedJobs from "../../models/FinishedJobs.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const jobs = await FinishedJobs.find({ businessId: id });
        return {
            statusCode: 200,
            body: JSON.stringify(jobs),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving business jobs', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};