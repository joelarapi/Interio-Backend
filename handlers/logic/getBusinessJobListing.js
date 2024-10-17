import JobListing from "../../models/JobListing";

export const handler = async (event) => {
    const { businessId } = event.pathParameters;

    try {
        const jobs = await JobListing.find({ businessId });
        return {
            statusCode: 200,
            body: JSON.stringify(jobs),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving business jobs', error }),
        };
    }
};