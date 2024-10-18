import Categorie from "../../models/Categories";
import connectDB from "../../configurations/connectDB";


export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        await connectDB();
        const category = await Categorie.findById(id);
        if (!category) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Category not found' }),
                headers: {
                    "Access-Control-Allow-Origin" : '*'
                 }
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(category),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving category', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};