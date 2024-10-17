import Categorie from "../../models/Categories";

export const handler = async () => {
    try {
        const categories = await Categorie.find();

        return {
            statusCode: 200,
            body: JSON.stringify(categories),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving categories', error }),
        };
    }
};