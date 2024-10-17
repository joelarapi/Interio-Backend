import JobListing from "../../models/JobListing";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const jobListing = await JobListing.findById(id).populate('postId').populate('businessId');
        if (!jobListing) {
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
            body: JSON.stringify(jobListing),
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