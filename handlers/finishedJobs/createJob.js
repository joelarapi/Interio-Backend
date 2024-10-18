import FinishedJobs from "../../models/FinishedJobs";
import connectDB from "../../configurations/connectDB";

export const handler = async (event) => {
    const finishedJobsData = JSON.parse(event.body);

    try {
        await connectDB();
        const newFinishedJobs = new FinishedJobs(finishedJobsData);
        await newFinishedJobs.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newFinishedJobs),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating job listing', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};