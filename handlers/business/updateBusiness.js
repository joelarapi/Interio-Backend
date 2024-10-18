import Business from "../../models/Business";
import connectDB from "../../configurations/connectDB";


export const handler = async (event) => {
    const { id } = event.pathParameters;
    const businessData = JSON.parse(event.body);

    try {
        await connectDB();
        const updatedBusiness = await Business.findByIdAndUpdate(id, businessData, {
            new: true,
            runValidators: true,
        });

        if (!updatedBusiness) {
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
            body: JSON.stringify(updatedBusiness),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating business', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};