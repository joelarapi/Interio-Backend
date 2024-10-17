import Categorie from "../../models/Categories";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const deletedCategory = await Categorie.findByIdAndDelete(id);

        if (!deletedCategory) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Category not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Category deleted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting category', error }),
        };
    }
};