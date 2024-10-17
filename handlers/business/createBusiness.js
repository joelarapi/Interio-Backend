import Business from "../../models/Business";

export const handler = async (event) => {
    const businessData = JSON.parse(event.body);

    try {
        const newBusiness = new Business(businessData);
        await newBusiness.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newBusiness),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating business', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};