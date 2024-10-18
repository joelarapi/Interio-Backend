import Categorie from "../../models/Categories";
import connectDB from "../../configurations/connectDB";


export const handler = async (event) => {
    const categoryData = JSON.parse(event.body);

    try {
        await connectDB();
        const newCategory = new Categorie(categoryData);
        await newCategory.save();

        return {
            statusCode: 201,
            body: JSON.stringify(newCategory),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error creating category', error }),
            headers: {
                "Access-Control-Allow-Origin" : '*'
             }
        };
    }
};