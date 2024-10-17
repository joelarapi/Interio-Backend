import Admin from "../../models/Admin";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Admin not found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(admin),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving admin', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};