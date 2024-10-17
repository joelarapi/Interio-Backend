import JobListing from "../../models/JobListing";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const jobListing = await JobListing.findById(id).populate('postId').populate('businessId');
        if (!jobListing) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Job listing not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(jobListing),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving job listing', error }),
        };
    }
};