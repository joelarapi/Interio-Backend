import Categorie from "../../models/Categories";

export const handler = async (event) => {
    const categoryData = JSON.parse(event.body);

    try {
        const newCategory = new Categorie(categoryData);
        await newCategory.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newCategory),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating category', error }),
        };
    }
};