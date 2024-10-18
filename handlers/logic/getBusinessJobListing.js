import FinishedJobs from "../../models/FinishedJobs";

export const handler = async (event) => {
    const { businessId } = event.pathParameters;

    try {
        const jobs = await FinishedJobs.find({ businessId });
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