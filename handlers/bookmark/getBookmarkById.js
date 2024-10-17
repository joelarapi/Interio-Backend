import Bookmark from "../../models/Bookmark";

export const handler = async (event) => {
    const { id } = event.pathParameters;

    try {
        const bookmark = await Bookmark.findById(id);
        if (!bookmark) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Bookmark not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(bookmark),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error retrieving bookmark', error }),
        };
    }
};