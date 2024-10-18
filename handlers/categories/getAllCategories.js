import Categorie from "../../models/Categories.js";
import connectDB from "../../configurations/connectDB.js";

export const handler = async () => {
    try {
        await connectDB();
        const categories = await Categorie.find();

        return {
            statusCode: 200,
            body: JSON.stringify(categories),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving categories', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};