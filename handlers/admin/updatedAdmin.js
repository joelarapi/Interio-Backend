import Admin from "../../models/Admin";

export const handler = async (event) => {
    const { id } = event.pathParameters;
    const adminData = JSON.parse(event.body);

    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(id, adminData, {
            new: true,
            runValidators: true,
        });

        if (!updatedAdmin) {
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
            body: JSON.stringify(updatedAdmin),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating admin', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};