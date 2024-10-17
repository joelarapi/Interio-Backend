import JobListing from "../../models/JobListing";

export const handler = async (event) => {
    const jobListingData = JSON.parse(event.body);

    try {
        const newJobListing = new JobListing(jobListingData);
        await newJobListing.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newJobListing),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating job listing', error }),
        };
    }
};