import Categorie from "../../models/Categories";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const category = await Categorie.findById(id);
        if (!category) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Category not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(category),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving category', error }),
        };
    }
};