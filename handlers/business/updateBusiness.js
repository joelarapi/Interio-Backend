import Business from "../../models/Business";

export const handler = async (event) => {
    const { id } = event.pathParameters;
    const businessData = JSON.parse(event.body);

    try {
        const updatedBusiness = await Business.findByIdAndUpdate(id, businessData, {
            new: true,
            runValidators: true,
        });

        if (!updatedBusiness) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Business not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(updatedBusiness),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating business', error }),
        };
    }
};